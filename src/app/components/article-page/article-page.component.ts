import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject, takeUntil, switchMap, of, map, catchError } from 'rxjs';
import { Article, ArticleState } from '../../interfaces/article.interface';
import { SpaceflightNewsService } from '../../services/spaceflight-news.service';
import { ArticleStateService } from '../../services/article-state.service';
import { formatDate } from '../../helpers/date.helpers';
import { ButtonComponent } from '../button/button.component';
import { DEFAULT_IMAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ButtonComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  state$: Observable<ArticleState>;
  private destroy$ = new Subject<void>();
    
  readonly DEFAULT_IMAGES = DEFAULT_IMAGES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spaceflightNewsService: SpaceflightNewsService,
    private articleStateService: ArticleStateService
  ) {
    this.state$ = this.articleStateService.state$;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const articleId = params['id'];
          if (!articleId) {
            this.router.navigate(['/']);
            return of(null);
          }
          return this.loadArticle(articleId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadArticle(articleId: string): Observable<Article | null> {
    this.articleStateService.setLoading(true);

    return this.spaceflightNewsService.getArticleById(articleId).pipe(
      map((article) => {
        if (article) {
          this.articleStateService.setArticle(article);
          this.articleStateService.setLoading(false);
          return article;
        } else {
          this.articleStateService.setLoading(false);
          this.router.navigate(['/']);
          return null;
        }
      }),
      catchError((error) => {
        console.error('Error loading article:', error);
        this.articleStateService.setLoading(false);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

  onBackClick(): void {
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  formatArticleContent(content: string): string {
    if (!content) return '';

    const cleanContent = this.cleanHtmlContent(content);

    if (!cleanContent.includes('<')) {
      return cleanContent
        .split('\n')
        .filter((paragraph) => paragraph.trim())
        .map((paragraph) => `<p>${paragraph.trim()}</p>`)
        .join('');
    }

    return cleanContent;
  }

  private cleanHtmlContent(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== DEFAULT_IMAGES.ARTICLE) {
      img.src = DEFAULT_IMAGES.ARTICLE;
    }
  }
}
