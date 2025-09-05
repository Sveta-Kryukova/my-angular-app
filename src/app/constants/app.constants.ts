
export const API_CONFIG = {
  BASE_URL: 'https://api.spaceflightnewsapi.net/v4',
  LIMIT: 20,
  SEARCH_THRESHOLD: 20,
  MAX_TOTAL_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
} as const;

export const DATE_CONFIG = {
  MONTH_NAMES: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

export const UI_CONFIG = {
  SCROLL_THRESHOLD: 100,
  SCROLL_RESTORE_DELAY: 300,
  INFINITE_SCROLL_THRESHOLD: 100,
} as const;

export const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

export const ORDINAL_SUFFIXES = {
  SPECIAL_CASES: [11, 12, 13] as number[],
  SUFFIXES: {
    1: 'st',
    2: 'nd',
    3: 'rd',
    default: 'th',
  },
} as const;

export const ERROR_MESSAGES = {
  ARTICLE_NOT_FOUND: 'Article not found',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_DATE: 'Invalid date format',
  LOADING_ERROR: 'Error loading data',
} as const;

export const CACHE_KEYS = {
  ARTICLES: 'articles',
  SEARCH_TERM: 'searchTerm',
  SCROLL_POSITION: 'scrollPosition',
} as const;

export const DEFAULT_IMAGES = {
  ARTICLE: 'assets/images/default-image.svg',
  CALENDAR_ICON: 'assets/icons/calendar-icon.svg',
  ARROW_RIGHT_ICON: 'assets/icons/arrow-right-icon.svg',
  ARROW_LEFT_ICON: 'assets/icons/arrow-left-icon.svg',
} as const;
