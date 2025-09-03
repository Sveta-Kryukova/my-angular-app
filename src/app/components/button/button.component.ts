import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() iconUrl: string = '';
  @Input() iconAlt: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Output() buttonClick = new EventEmitter<void>();

  get buttonClasses(): string {
    return `button button--${this.variant}${
      this.disabled ? ' button--disabled' : ''
    } button--icon-${this.iconPosition}`;
  }

  onButtonClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
