import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe is a custom pipe to truncate a string to a specified length.
 * If the string exceeds the specified length, it appends '...' to the truncated string.
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Transforms the input string by truncating it to the specified limit.
   * @param value - The input string to be truncated.
   * @param limit - The maximum length of the truncated string (default is 50).
   * @returns The truncated string with '...' appended if it exceeds the limit.
   */
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
