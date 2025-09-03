import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
