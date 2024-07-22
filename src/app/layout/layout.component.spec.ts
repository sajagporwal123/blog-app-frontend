import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';

import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { RouterTestingModule } from '@angular/router/testing'; // If LayoutComponent uses routing
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Optional: Use if you want to suppress unknown element errors
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../services/auth.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Add HttpClientTestingModule
        RouterTestingModule // Add RouterTestingModule if using routing
      ],
      declarations: [
        LayoutComponent, 
        HeaderComponent, 
        FooterComponent, 
        HomeComponent
      ],
      providers:[AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Optional: Use if you want to suppress unknown element errors
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit and change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
