import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'article', component: ArticlePageComponent },
  { path: '**', redirectTo: '' }
];
