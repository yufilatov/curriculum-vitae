import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { request } from 'node:https';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist', 'cv-angular', 'browser');
const branch = 'gh-pages';
const publishDir = join(tmpdir(), `curriculum-vitae-pages-${process.pid}`);

function git(args, cwd) {
  execFileSync('git', args, { cwd, stdio: 'inherit' });
}

function gitOutput(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

function githubToken() {
  const output = execFileSync('git', ['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n',
    encoding: 'utf8',
  });
  const password = output
    .split('\n')
    .find((line) => line.startsWith('password='))
    ?.slice('password='.length);
  if (!password) {
    throw new Error('GitHub credentials are not available for git.');
  }
  return password;
}

function github(method, path, token, body) {
  const data = body ? JSON.stringify(body) : null;
  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname: 'api.github.com',
        path,
        method,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'curriculum-vitae-deploy',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(data
            ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
              }
            : {}),
        },
      },
      (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          raw += chunk;
        });
        res.on('end', () => {
          const parsed = raw ? JSON.parse(raw) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
            return;
          }
          const error = new Error(parsed.message || `GitHub API ${method} ${path} failed`);
          error.status = res.statusCode;
          reject(error);
        });
      },
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function enablePages(repo, token) {
  const source = { branch, path: '/' };
  const body = { build_type: 'legacy', source };
  try {
    const pages = await github('GET', `/repos/${repo}/pages`, token);
    const current = pages.source ?? {};
    if (current.branch === source.branch && current.path === source.path) {
      return pages;
    }
    return await github('PUT', `/repos/${repo}/pages`, token, body);
  } catch (error) {
    if (error.status !== 404) throw error;
    return github('POST', `/repos/${repo}/pages`, token, body);
  }
}

const indexPath = join(distDir, 'index.html');
if (!existsSync(indexPath)) {
  throw new Error('Build output is missing. Run ng build before publishing.');
}

writeFileSync(join(distDir, '.nojekyll'), '');
cpSync(indexPath, join(distDir, '404.html'));

const remote = gitOutput(['remote', 'get-url', 'origin'], process.cwd());
const repo = remote.match(/github\.com[:/](.+?)(?:\.git)?$/)?.[1];
if (!repo) {
  throw new Error(`Origin is not a GitHub repository: ${remote}`);
}

rmSync(publishDir, { recursive: true, force: true });

try {
  const existing = gitOutput(['ls-remote', '--heads', 'origin', branch], process.cwd());
  if (existing) {
    git(
      ['clone', '--branch', branch, '--single-branch', '--depth', '1', remote, publishDir],
      process.cwd(),
    );
  } else {
    mkdirSync(publishDir, { recursive: true });
    git(['init', '-b', branch], publishDir);
    git(['remote', 'add', 'origin', remote], publishDir);
  }

  for (const entry of readdirSync(publishDir)) {
    if (entry === '.git') continue;
    rmSync(join(publishDir, entry), { recursive: true, force: true });
  }

  for (const entry of readdirSync(distDir)) {
    cpSync(join(distDir, entry), join(publishDir, entry), { recursive: true });
  }
  git(['add', '-A'], publishDir);

  const status = gitOutput(['status', '--porcelain'], publishDir);
  if (status) {
    git(['commit', '-m', 'Publish the CV to GitHub Pages'], publishDir);
    git(['push', 'origin', branch], publishDir);
  } else {
    console.log('GitHub Pages already has this build.');
  }
} finally {
  rmSync(publishDir, { recursive: true, force: true });
}

const pages = await enablePages(repo, githubToken());
const url = pages.html_url ?? `https://${repo.split('/')[0]}.github.io/${repo.split('/')[1]}/`;
console.log(`Published: ${url}`);
