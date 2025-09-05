import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArticleState } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleStateService {
  private stateSubject = new BehaviorSubject<ArticleState>({
    article: null,
    isLoading: true,
    isLoadingFullContent: false,
    fullContentFailed: false,
    hasAttemptedFullContent: false,
  });

  state$: Observable<ArticleState> = this.stateSubject.asObservable();

  /**
   * Update state with partial updates
   */
  updateState(updates: Partial<ArticleState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...updates });
  }

  /**
   * Set loading state
   */
  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  /**
   * Set article
   */
  setArticle(article: any): void {
    this.updateState({ article });
  }
}
