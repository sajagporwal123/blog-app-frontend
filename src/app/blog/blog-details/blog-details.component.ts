import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from '../../services/blog.service';
import { ToasterService } from './../../services/toaster.service';

/**
 * BlogDetailsComponent displays the details of a specific blog.
 */
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  id: string = '';
  blog?: Blog;

  /**
   * Constructor to inject required services.
   * @param blogService - Service to fetch blog data.
   * @param route - Service to access route parameters.
   */
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private toasterService: ToasterService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Fetches the blog ID from the route and loads the blog details.
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadBlogDetails();
  }

  /**
   * Fetches the blog details from the BlogService.
   */
  async loadBlogDetails(): Promise<void> {
    this.blogService.getBlog(this.id).subscribe(
      (apiResponse: Blog) => {
        this.blog = apiResponse;
        if (!this.blog) {
          this.toasterService.showError('Error', 'Blog not found');
        }
      },
      (error: any) => {
        console.error('Error fetching blog details:', error);
      }
    );
  }
}
