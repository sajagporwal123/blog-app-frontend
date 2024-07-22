import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogService } from '../../../services/blog.service';
import { ToasterService } from '../../../services/toaster.service';
import { CreateBlogComponent } from './create-blog.component';

describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockToasterService: jasmine.SpyObj<ToasterService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockBlogService = jasmine.createSpyObj('BlogService', ['createBlog']);
    mockToasterService = jasmine.createSpyObj('ToasterService', ['showSuccess', 'showError']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CKEditorModule], // Import CKEditorModule
      declarations: [CreateBlogComponent],
      providers: [
        { provide: BlogService, useValue: mockBlogService },
        { provide: ToasterService, useValue: mockToasterService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore CKEditor unknown elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
