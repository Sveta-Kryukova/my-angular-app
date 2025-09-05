import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { DEFAULT_IMAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() imageUrl: string = '';
  @Input() date: string = '';
  @Input() articleId: string = '';
  @Input() searchTerm: string | null = '';
  @Output() cardClick = new EventEmitter<string>();

  readonly DEFAULT_IMAGES = DEFAULT_IMAGES;

  private cachedHighlightedTitle: string = '';
  private cachedHighlightedContent: string = '';
  private lastSearchTerm: string = '';
  private lastTitle: string = '';
  private lastContent: string = '';

  get displayImageUrl(): string {
    return this.imageUrl?.trim() ? this.imageUrl : DEFAULT_IMAGES.ARTICLE;
  }

  get highlightedTitle(): string {
    if (this.shouldRecalculateTitle()) {
      this.cachedHighlightedTitle = this.calculateHighlightedTitle();
      this.lastSearchTerm = this.searchTerm || '';
      this.lastTitle = this.title;
    }
    return this.cachedHighlightedTitle;
  }

  get highlightedContent(): string {
    if (this.shouldRecalculateContent()) {
      this.cachedHighlightedContent = this.calculateHighlightedContent();
      this.lastSearchTerm = this.searchTerm || '';
      this.lastContent = this.content;
    }
    return this.cachedHighlightedContent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['content'] || changes['searchTerm']) {
      this.invalidateCache();
    }
  }

  onCardClick(): void {
    this.cardClick.emit(this.articleId);
  }

  onReadMoreClick(): void {
    this.cardClick.emit(this.articleId);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== DEFAULT_IMAGES.ARTICLE) {
      img.src = DEFAULT_IMAGES.ARTICLE;
    }
  }

  private shouldRecalculateTitle(): boolean {
    return this.lastSearchTerm !== (this.searchTerm || '') || this.lastTitle !== this.title;
  }

  private shouldRecalculateContent(): boolean {
    return this.lastSearchTerm !== (this.searchTerm || '') || this.lastContent !== this.content;
  }

  private invalidateCache(): void {
    this.cachedHighlightedTitle = '';
    this.cachedHighlightedContent = '';
  }

  private calculateHighlightedTitle(): string {
    const truncatedTitle = this.getTruncatedTitle();
    return this.highlightKeywords(truncatedTitle, this.searchTerm || '');
  }

  private calculateHighlightedContent(): string {
    const truncatedContent = this.getTruncatedContent();
    return this.highlightKeywords(truncatedContent, this.searchTerm || '');
  }

  private getTruncatedTitle(): string {
    const maxTotalLength = 100;

    if (this.title.length >= maxTotalLength) {
      return this.truncateText(this.title, maxTotalLength);
    }

    if (this.title.length + this.content.length <= maxTotalLength) {
      return this.title;
    }

    const minDescriptionLength = 20;
    const maxTitleLength = maxTotalLength - minDescriptionLength;

    return this.title.length <= maxTitleLength
      ? this.title
      : this.truncateText(this.title, maxTitleLength);
  }

  private getTruncatedContent(): string {
    const maxTotalLength = 100;
    const titleLength = this.getTruncatedTitle().length;
    const availableLength = maxTotalLength - titleLength;

    if (availableLength <= 0) {
      return '';
    }

    return this.content.length <= availableLength
      ? this.content
      : this.truncateText(this.content, availableLength);
  }

  private truncateText(text: string, maxLength: number): string {
    return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...';
  }

  private highlightKeywords(text: string, searchTerm: string): string {
    if (!searchTerm || !text) {
      return text;
    }

    const keywords = this.extractKeywords(searchTerm);
    return keywords.reduce((highlightedText, keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      return highlightedText.replace(regex, '<mark class="highlight">$1</mark>');
    }, text);
  }

  private extractKeywords(searchTerm: string): string[] {
    return searchTerm
      .toLowerCase()
      .split(' ')
      .filter((word) => word.length > 0);
  }
}
