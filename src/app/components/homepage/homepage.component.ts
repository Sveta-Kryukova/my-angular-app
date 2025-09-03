import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  articles = [
    {
      id: '1',
      title: "The 2020 World's Most Valuable Brands",
      content:
        'Non sed molestie tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'June 29th, 2021',
    },
    {
      id: '2',
      title: 'The Top 100 Software Companies Of 2020',
      content:
        'Non sed molestie tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'June 15th, 2021',
    },
    {
      id: '3',
      title: 'Healthcare updates',
      content:
        'Non sed IT companies tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'June 1st, 2021',
    },
    {
      id: '4',
      title: 'Healthcare updates',
      content:
        'Non sed IT companies tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'May 28th, 2021',
    },
    {
      id: '5',
      title: 'Business moguls',
      content:
        'Non sed successful tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'May 5th, 2021',
    },
    {
      id: '6',
      title: "The 2020 World's Most Valuable Brands",
      content:
        'Non sed molestie tortor massa vitae in mattis. Eget vel consequat hendrerit commodo libero aliquam. Urna arcu nunc tortor vitae pharetra...',
      imageUrl: '',
      date: 'April 30th, 2021',
    },
  ];

  constructor(private router: Router) {}

  onCardClick(articleId: string): void {
    this.router.navigate(['/article', articleId]);
  }

  get resultsCount(): number {
    return this.articles.length;
  }
}
