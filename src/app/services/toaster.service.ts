import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * ToasterService provides functionality to display toast notifications.
 */
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  /**
   * Constructor to inject the ToastrService.
   * @param toastr - Service to display toast notifications.
   */
  constructor(private toastr: ToastrService) {}

  /**
   * Displays a success toast notification.
   * @param title - The title of the toast.
   * @param message - The message of the toast.
   */
  showSuccess(title: string, message: string): void {
    this.toastr.success(message, title);
  }

  showError(title: string, message: string): void {
    this.toastr.error(message, title);
  }
}
