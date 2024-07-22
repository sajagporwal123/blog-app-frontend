import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToasterService } from '../../../services/toaster.service';
import { BlogService } from '../../../services/blog.service';

/**
 * Component for creating a new blog.
 */
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  public Editor = ClassicEditor;
  public content: string = '';
  public editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
    ],
  };

  /**
   * Constructor to inject required services and initialize the form.
   * @param fb - FormBuilder to create the form.
   * @param blogService - Service to handle blog-related operations.
   * @param router - Router to navigate between pages.
   * @param toasterService - Service to show toast notifications.
   */
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
    });
  }

  /**
   * Submits the blog creation form.
   * Validates the form and sends a request to create a new blog.
   */
  createBlog(): void {
    if (this.blogForm.valid) {
      this.blogService.createBlog(this.blogForm.value).subscribe(
        (data) => {
          this.toasterService.showSuccess('Success', 'Blog Added Successfully');
          // this.blogForm.reset();
          this.blogForm.reset({
            title: '',
            content: ''
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error creating blog:', error);
        }
      );
    }
  }

  /**
   * Resets the blog form and navigates back to the home page.
   */
  onCancel(): void {
    this.blogForm.reset();
    this.router.navigate(['/']);
  }
}
