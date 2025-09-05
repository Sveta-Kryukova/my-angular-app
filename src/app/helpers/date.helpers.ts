import { DATE_CONFIG, TIME_UNITS, ORDINAL_SUFFIXES } from '../constants/app.constants';

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const month = DATE_CONFIG.MONTH_NAMES[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const month = DATE_CONFIG.MONTH_NAMES[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year} at ${time}`;
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / TIME_UNITS.SECOND);

    if (diffInSeconds < 60) {
      return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    }

    return formatDate(dateString);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateString;
  }
}

export function isToday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
}

export function isYesterday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  } catch (error) {
    console.error('Error checking if date is yesterday:', error);
    return false;
  }
}

function getOrdinalSuffix(day: number): string {
  if (ORDINAL_SUFFIXES.SPECIAL_CASES.includes(day)) {
    return ORDINAL_SUFFIXES.SUFFIXES.default;
  }

  const lastDigit = day % 10;
  return (
    ORDINAL_SUFFIXES.SUFFIXES[lastDigit as keyof typeof ORDINAL_SUFFIXES.SUFFIXES] ||
    ORDINAL_SUFFIXES.SUFFIXES.default
  );
}
