import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() imageUrl: string = '';
  @Input() date: string = 'June 29th, 2021';

  get displayImageUrl(): string {
    return this.imageUrl || 'assets/images/default-image.svg';
  }
}
