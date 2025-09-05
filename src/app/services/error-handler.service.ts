import { Injectable } from '@angular/core';
import { ERROR_MESSAGES } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
  }

  getErrorMessage(error: any): string {
    if (error?.status === 404) {
      return ERROR_MESSAGES.ARTICLE_NOT_FOUND;
    }

    if (error?.status >= 500) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    return ERROR_MESSAGES.LOADING_ERROR;
  }
}
