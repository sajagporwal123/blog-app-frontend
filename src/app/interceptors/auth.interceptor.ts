import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

/**
 * Intercepts HTTP requests to add authorization token and handle errors.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor to inject required services.
   * @param authService - Service to handle authentication.
   * @param logger - Service to log messages and errors.
   */
  constructor(
    private authService: AuthService,
    private logger: LoggerService
  ) {}

  /**
   * Intercepts HTTP requests to add the authorization token and handle errors.
   * @param req - The outgoing HTTP request.
   * @param next - The next interceptor in the chain.
   * @returns An observable of the HTTP event.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    let authReq = req;

    if (authToken) {
      // Clone the request and set the new header in one step.
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      this.logger.log('Authorization token added to request headers');
    }

    // Clone the request to add the Content-Type header
    const clonedRequest = authReq.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return next.handle(clonedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        // Log successful requests if needed
        this.logger.log('Request successfully sent', event);
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle and log errors
        this.logger.error('Request failed', error);
        if (error.status === 401) {
          // Log out the user and redirect to login page if 401 Unauthorized
          this.authService.logout();
          // this.router.navigate(['/login']); // Uncomment and import Router if navigation is needed
          this.logger.log('User logged out due to unauthorized access');
        }
        return throwError(() => error);
      })
    );
  }
}
