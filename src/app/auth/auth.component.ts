import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gapi, loadGapiInsideDOM } from 'gapi-script';
import { environment } from '../../environments/environment';
import { GoogleLoginJWT } from '../models/google-login.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  initGoogleSignIn() {
    loadGapiInsideDOM().then(() => {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init({
          client_id: environment.GOOGLE_CLIENT_ID,
          scope: 'profile email',
        });

        auth2.attachClickHandler(
          document.getElementById('googleSignInButton'),
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            const idToken = googleUser.getAuthResponse().id_token;
            this.onSignInSuccess(idToken);
          },
          (error) => {
            // console.log('error', JSON.stringify(error, undefined, 2));
          }
        );
      });
    });
  }

  onSignInSuccess(idToken: string) {
    this.authService
      .getJWTToken(idToken)
      .subscribe((response: GoogleLoginJWT) => {
        this.authService.setToken(response.jwt);
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
