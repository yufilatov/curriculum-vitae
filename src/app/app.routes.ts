import { Routes } from '@angular/router';

import { CvPage } from './cv-page';

export const routes: Routes = [
  { path: '', component: CvPage, data: { lang: 'en' } },
  { path: 'ru', component: CvPage, data: { lang: 'ru' } },
  { path: '**', redirectTo: '' },
];
