import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';

import { cv, type Lang } from './cv';
import { CvDocument } from './cv-document';

@Component({
  selector: 'app-cv-page',
  imports: [RouterLink, RouterLinkActive, CvDocument],
  templateUrl: './cv-page.html',
})
export class CvPage {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly lang = toSignal(
    this.route.data.pipe(map((data) => data['lang'] as Lang)),
    { initialValue: (this.route.snapshot.data['lang'] as Lang | undefined) ?? 'en' },
  );

  readonly copy = computed(() => cv[this.lang()]);

  constructor() {
    effect(() => {
      const copy = this.copy();
      this.title.setTitle(`${copy.name} — ${copy.role}`);
      this.meta.updateTag({ name: 'description', content: copy.summary });
      document.documentElement.lang = this.lang();
    });
  }

  print(): void {
    window.print();
  }
}
