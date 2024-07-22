import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from './toaster.service'; // Adjust import path as necessary

describe('ToasterService', () => {
  let service: ToasterService;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      providers: [
        ToasterService,
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });

    service = TestBed.inject(ToasterService);
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
