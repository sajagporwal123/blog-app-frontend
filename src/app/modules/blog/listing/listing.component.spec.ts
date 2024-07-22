import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { ToasterService } from '../../../services/toaster.service';
import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let blogService: jasmine.SpyObj<BlogService>;
  let toasterService: jasmine.SpyObj<ToasterService>;
  let modalService: jasmine.SpyObj<BsModalService>;

  beforeEach(async () => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getBlogs', 'deleteBlog']);
    const toasterServiceSpy = jasmine.createSpyObj('ToasterService', ['showSuccess']);
    const modalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [ ListingComponent ],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        { provide: ToasterService, useValue: toasterServiceSpy },
        { provide: BsModalService, useValue: modalServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
    toasterService = TestBed.inject(ToasterService) as jasmine.SpyObj<ToasterService>;
    modalService = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogs on initialization', () => {
    const mockResponse = { data: [], total: 0 };
    blogService.getBlogs.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(blogService.getBlogs).toHaveBeenCalled();
    expect(component.blogs).toEqual([]);
  });
});
