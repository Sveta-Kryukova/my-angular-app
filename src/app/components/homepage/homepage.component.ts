import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { SpaceflightNewsService } from '../../services/spaceflight-news.service';
import { formatDate } from '../../helpers/date.helpers';
import { SearchComponent } from '../search/search.component';
import { CardComponent } from '../card/card.component';
import { UI_CONFIG } from '../../constants/app.constants';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchComponent, CardComponent, MatProgressSpinnerModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  filteredArticles$: Observable<Article[]>;
  resultsCount$: Observable<number>;
  currentSearchTerm$: Observable<string>;
  isLoading = false;
  isInitialLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private spaceflightNewsService: SpaceflightNewsService, private router: Router) {
    this.filteredArticles$ = this.spaceflightNewsService.getFilteredArticles();
    this.resultsCount$ = this.spaceflightNewsService.getResultsCount();
    this.currentSearchTerm$ = this.spaceflightNewsService.getCurrentSearchTerm();
  }

  ngOnInit(): void {
    this.spaceflightNewsService
      .initializeArticles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isInitialLoading = false;
        },
        error: (error) => {
          console.error('Error loading initial articles:', error);
          this.isInitialLoading = false;
        },
      });

    this.filteredArticles$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (articles) => {
        this.ensureEnoughArticlesForSearch();
      },
    });

    this.currentSearchTerm$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (searchTerm) => {
        if (searchTerm) {
          this.ensureEnoughArticlesForSearch();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - UI_CONFIG.INFINITE_SCROLL_THRESHOLD
    ) {
      this.loadMoreArticles();
    }
  }

  onCardClick(articleId: string): void {
    this.spaceflightNewsService.saveScrollPosition();
    this.router.navigate(['/article', articleId]);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  private ensureEnoughArticlesForSearch(): void {
    if (this.spaceflightNewsService.needsMoreArticlesForSearch()) {
      this.spaceflightNewsService
        .loadMoreArticlesForSearch()
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  private loadMoreArticles(): void {
    if (!this.isLoading && this.spaceflightNewsService.hasMoreArticles()) {
      this.isLoading = true;
      this.spaceflightNewsService
        .loadMoreArticles()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading more articles:', error);
            this.isLoading = false;
          },
        });
    }
  }
}
