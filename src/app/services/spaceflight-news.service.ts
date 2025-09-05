import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, shareReplay, BehaviorSubject, combineLatest, catchError, of } from 'rxjs';
import {
  Article,
  SpaceflightApiResponse,
  SpaceflightApiArticle,
} from '../interfaces/article.interface';
import { API_CONFIG, CACHE_KEYS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class SpaceflightNewsService {
  private readonly API_BASE_URL = API_CONFIG.BASE_URL;
  private articlesCache$: Observable<Article[]> | null = null;
  private allArticlesSubject = new BehaviorSubject<Article[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');
  private currentOffset = 0;
  private hasMorePages = true;
  private readonly LIMIT = API_CONFIG.LIMIT;
  private loadedArticleIds = new Set<string>();
  private isLoading = false;
  private scrollPosition = 0;

  constructor(private http: HttpClient) {}

  getFilteredArticles(): Observable<Article[]> {
    return combineLatest([
      this.allArticlesSubject.asObservable(),
      this.searchTermSubject.asObservable(),
    ]).pipe(
      map(([articles, searchTerm]) => {
        if (!searchTerm.trim()) {
          return articles;
        }

        const keywords = this.extractKeywords(searchTerm);
        return articles.filter((article) => this.matchesKeywords(article, keywords));
      })
    );
  }

  getResultsCount(): Observable<number> {
    return this.getFilteredArticles().pipe(map((articles) => articles.length));
  }

  getCurrentSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  getCurrentSearchTermValue(): string {
    return this.searchTermSubject.value;
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  getArticleById(id: string): Observable<Article | null> {
    return this.http.get<SpaceflightApiArticle>(`${this.API_BASE_URL}/articles/${id}`).pipe(
      map((apiArticle) => this.mapSpaceflightApiArticleToArticle(apiArticle)),
      catchError((error) => {
        console.error('Error fetching article:', error);
        return of(null);
      })
    );
  }

  loadMoreArticles(): Observable<Article[]> {
    if (!this.hasMorePages || this.isLoading) {
      return of([]);
    }

    this.isLoading = true;
    this.currentOffset += this.LIMIT;

    return this.fetchArticlesFromSpaceflightAPI().pipe(
      map((newArticles) => {
        const currentArticles = this.allArticlesSubject.value;
        const filteredNewArticles = newArticles.filter(
          (article) => !this.loadedArticleIds.has(article.id.toString())
        );

        filteredNewArticles.forEach((article) => {
          this.loadedArticleIds.add(article.id);
        });

        const updatedArticles = [...currentArticles, ...filteredNewArticles];
        this.allArticlesSubject.next(updatedArticles);

        if (newArticles.length < this.LIMIT) {
          this.hasMorePages = false;
        }

        this.isLoading = false;
        return filteredNewArticles;
      }),
      catchError((error) => {
        console.error('Error loading more articles:', error);
        this.currentOffset -= this.LIMIT;
        this.isLoading = false;
        return of([]);
      })
    );
  }

  loadFullContent(articleUrl: string): Observable<string> {
    return of('');
  }

  searchArticles(searchTerm: string): void {
    this.setSearchTerm(searchTerm);

    if (searchTerm.trim()) {
      this.ensureEnoughArticlesForSearch();
    }
  }

  loadMoreArticlesForSearch(): Observable<Article[]> {
    return this.loadMoreArticles();
  }

  needsMoreArticlesForSearch(): boolean {
    const currentArticles = this.allArticlesSubject.value;
    const searchTerm = this.searchTermSubject.value;

    if (!searchTerm.trim()) {
      return false;
    }

    const keywords = this.extractKeywords(searchTerm);
    const matchingArticles = currentArticles.filter((article) =>
      this.matchesKeywords(article, keywords)
    );

    return matchingArticles.length < 20 && this.hasMorePages;
  }

  hasMoreArticles(): boolean {
    return this.hasMorePages;
  }

  saveScrollPosition(): void {
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    sessionStorage.setItem(CACHE_KEYS.SCROLL_POSITION, this.scrollPosition.toString());
  }

  getScrollPosition(): number {
    return this.scrollPosition;
  }

  restoreScrollPosition(): void {
    const savedPosition = sessionStorage.getItem(CACHE_KEYS.SCROLL_POSITION);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      window.scrollTo(0, position);
      sessionStorage.removeItem(CACHE_KEYS.SCROLL_POSITION);
    }
  }

  clearCache(): void {
    this.articlesCache$ = null;
    this.allArticlesSubject.next([]);
    this.currentOffset = 0;
    this.hasMorePages = true;
    this.loadedArticleIds.clear();
    this.isLoading = false;
  }

  initializeArticles(): Observable<Article[]> {
    if (this.articlesCache$) {
      return this.articlesCache$;
    }

    this.articlesCache$ = this.fetchArticlesFromSpaceflightAPI().pipe(
      map((articles) => {
        articles.forEach((article) => {
          this.loadedArticleIds.add(article.id);
        });
        this.allArticlesSubject.next(articles);
        return articles;
      }),
      shareReplay(1)
    );

    return this.articlesCache$;
  }

  private fetchArticlesFromSpaceflightAPI(): Observable<Article[]> {
    const params = new HttpParams()
      .set('limit', this.LIMIT.toString())
      .set('offset', this.currentOffset.toString());

    return this.http.get<SpaceflightApiResponse>(`${this.API_BASE_URL}/articles`, { params }).pipe(
      map((response) => this.mapSpaceflightApiResponseToArticles(response)),
      catchError((error) => {
        console.error('Error fetching articles from Spaceflight API:', error);
        return of([]);
      })
    );
  }

  private mapSpaceflightApiResponseToArticles(response: SpaceflightApiResponse): Article[] {
    return response.results.map((apiArticle) => this.mapSpaceflightApiArticleToArticle(apiArticle));
  }

  private mapSpaceflightApiArticleToArticle(apiArticle: SpaceflightApiArticle): Article {
    return {
      id: apiArticle.id.toString(),
      title: apiArticle.title,
      summary: apiArticle.summary,
      imageUrl: apiArticle.image_url || '',
      publishedAt: apiArticle.published_at,
      url: apiArticle.url,
    };
  }

  private ensureEnoughArticlesForSearch(): void {
    const currentArticles = this.allArticlesSubject.value;
    const searchTerm = this.searchTermSubject.value;

    if (!searchTerm.trim()) {
      return;
    }

    const keywords = this.extractKeywords(searchTerm);
    const matchingArticles = currentArticles.filter((article) =>
      this.matchesKeywords(article, keywords)
    );

    if (matchingArticles.length < 20 && this.hasMorePages && !this.isLoading) {
      this.loadMoreArticles().subscribe({
        next: () => {
          this.ensureEnoughArticlesForSearch();
        },
        error: (error) => {
          console.error('Error loading more articles for search:', error);
        },
      });
    }
  }

  private extractKeywords(searchTerm: string): string[] {
    return searchTerm
      .toLowerCase()
      .split(' ')
      .filter((word) => word.length > 0);
  }

  private matchesKeywords(article: Article, keywords: string[]): boolean {
    const titleMatch = keywords.some((keyword) => article.title.toLowerCase().includes(keyword));
    const contentMatch = keywords.some((keyword) =>
      article.summary.toLowerCase().includes(keyword)
    );
    return titleMatch || contentMatch;
  }
}
