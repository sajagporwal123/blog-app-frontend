import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

/**
 * HeaderComponent displays the header of the application.
 * It handles user authentication status and logout functionality.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;

  /**
   * Constructor to inject required services.
   * @param authService - Service to handle authentication.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Checks if the user is authenticated.
   */
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    // Cleanup logic can be added here if needed.
  }

  /**
   * Logs out the user by calling the AuthService's logout method.
   */
  logout(): void {
    this.authService.logout();
  }
}
