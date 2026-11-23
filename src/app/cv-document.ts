import { Component, input } from '@angular/core';

import type { CvCopy } from './cv';

@Component({
  selector: 'app-cv-document',
  templateUrl: './cv-document.html',
})
export class CvDocument {
  readonly data = input.required<CvCopy>();
}
