import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BlogDetailsComponent } from './blog-details.component';
import { BlogService } from '../../../services/blog.service';
import { ToasterService } from '../../../services/toaster.service';
import { Blog } from '../../../models/blog.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockToasterService: jasmine.SpyObj<ToasterService>;
  let mockActivatedRoute: ActivatedRoute;

  const mockBlog: Blog = {
    _id: '1',
    title: 'Test Blog',
    content: 'This is a test blog content.',
    createdAt: new Date(),
    user: {
      email: 'test@email.com',
      name: 'test',
      picture: 'dummyUrl',
    }
  };
  beforeEach(async () => {
    mockBlogService = jasmine.createSpyObj('BlogService', ['getBlog']);
    mockToasterService = jasmine.createSpyObj('ToasterService', ['showError']);
    mockActivatedRoute = {
      snapshot: { params: { id: '1' } }
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [BlogDetailsComponent],
      providers: [
        { provide: BlogService, useValue: mockBlogService },
        { provide: ToasterService, useValue: mockToasterService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    // Spy on console.error
    spyOn(console, 'error');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display blog details on initialization', () => {
    mockBlogService.getBlog.and.returnValue(of(mockBlog));

    component.ngOnInit();

    expect(mockBlogService.getBlog).toHaveBeenCalledWith('1');
    expect(component.blog).toEqual(mockBlog);
  });

  it('should handle error if fetching blog details fails', () => {
    const errorResponse = { error: { error: 'Failed to fetch blog details' } };
    mockBlogService.getBlog.and.returnValue(throwError(errorResponse));

    component.ngOnInit();

    expect(mockBlogService.getBlog).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('Error fetching blog details:', errorResponse);
    expect(mockToasterService.showError).toHaveBeenCalledWith('Error', 'Failed to fetch blog details');
  });
});
