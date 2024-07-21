import { Injectable } from '@angular/core';

/**
 * LoggerService provides logging functionality for the application.
 * It supports logging informational messages and errors.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * Logs an informational message to the console.
   * @param message - The message to log.
   * @param data - Optional additional data to log.
   */
  log(message: string, data?: any): void {
    // console.log(message, data);
  }

  /**
   * Logs an error message to the console.
   * @param message - The error message to log.
   * @param data - Optional additional data to log.
   */
  error(message: string, data?: any): void {
    console.error(message, data);
  }
}
