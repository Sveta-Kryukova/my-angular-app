export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string; 
  imageUrl: string;
  publishedAt: string;
  url: string;
  matchScore?: number;
  newsSite?: string; 
  featured?: boolean; 
  launches?: any[]; 
  events?: any[]; 
}

export interface SpaceflightApiResponse {
  results: SpaceflightApiArticle[];
  count: number;
  next?: string;
  previous?: string;
}

export interface SpaceflightApiArticle {
  id: number;
  title: string;
  summary: string;
  content?: string;
  news_site?: string;
  featured?: boolean;
  launches?: any[];
  events?: any[];
  image_url?: string;
  published_at: string;
  url: string;
}

export interface ArticleState {
  article: Article | null;
  isLoading: boolean;
  isLoadingFullContent: boolean;
  fullContentFailed: boolean;
  hasAttemptedFullContent: boolean;
}

export interface SearchResult {
  articles: Article[];
  totalCount: number;
  hasMore: boolean;
}
