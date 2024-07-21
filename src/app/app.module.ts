import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * AppModule is the root module of the application.
 * It imports necessary modules and sets up global providers and configurations.
 */
@NgModule({
  declarations: [
    AppComponent, // Main application component
  ],
  imports: [
    BrowserModule, // Required for running Angular applications in the browser
    BrowserAnimationsModule, // Required for animations in Angular
    AppRoutingModule, // Configures application routes
    HttpClientModule, // Provides HttpClient for making HTTP requests
    AuthModule, // Imports authentication module
    ToastrModule.forRoot(), // Configures ToastrModule for toast notifications
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, // Adds AuthInterceptor to handle authentication tokens and errors
  ],
  bootstrap: [AppComponent], // Bootstraps the root component of the application
})
export class AppModule {}
