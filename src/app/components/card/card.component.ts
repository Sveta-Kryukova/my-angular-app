import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() imageUrl: string = '';
  @Input() date: string = 'June 29th, 2021';
  @Input() articleId: string = '';
  @Output() cardClick = new EventEmitter<string>();

  get displayImageUrl(): string {
    return this.imageUrl || 'assets/images/default-image.svg';
  }

  onCardClick(): void {
    this.cardClick.emit(this.articleId);
  }

  onReadMoreClick(): void {
    this.cardClick.emit(this.articleId);
  }
}
