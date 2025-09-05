import { Routes } from '@angular/router';
import { ArticleGuard } from './guards/article.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./components/article-page/article-page.component').then(
        (m) => m.ArticlePageComponent
      ),
    canActivate: [ArticleGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
