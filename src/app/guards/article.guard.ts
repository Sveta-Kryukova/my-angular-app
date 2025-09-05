import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SpaceflightNewsService } from '../services/spaceflight-news.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleGuard implements CanActivate {
  constructor(private spaceflightNewsService: SpaceflightNewsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const articleId = route.paramMap.get('id');

    if (!articleId || !this.isValidId(articleId)) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.spaceflightNewsService.getArticleById(articleId).pipe(
      map((article) => {
        if (!article) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

  private isValidId(id: string): boolean {
    return /^\d+$/.test(id);
  }
}
