import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchComponent, CardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
}
