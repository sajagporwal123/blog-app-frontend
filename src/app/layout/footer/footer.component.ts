import { Component } from '@angular/core';

/**
 * FooterComponent displays the footer of the application.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  /**
   * The current year to be displayed in the footer.
   */
  currentYear: number = new Date().getFullYear();
}
