import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceflightNewsService } from '../../services/spaceflight-news.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private spaceflightNewsService: SpaceflightNewsService) {}

  ngOnInit(): void {
    this.searchTerm = this.spaceflightNewsService.getCurrentSearchTermValue();
  }

  onSearchChange(): void {
    this.spaceflightNewsService.setSearchTerm(this.searchTerm);
  }
}
