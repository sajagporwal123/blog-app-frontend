import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from '../../services/blog.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  public blogs: Blog[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 9;
  public totalPages: number = 0;
  public totalPagesArray: number[] = [];
  private idToBeDeleted: string = '';
  public message: string = '';
  private modalRef: BsModalRef | null = null;

  constructor(
    private blogService: BlogService,
    private modalService: BsModalService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    // Load initial set of blogs when the component initializes
    this.loadBlogs();
  }

  /**
   * Fetch blogs from the server with pagination.
   * Updates the blogs array, totalPages, and totalPagesArray.
   */
  private loadBlogs(): void {
    this.blogService
      .getBlogs({
        page: this.currentPage,
        limit: this.itemsPerPage,
      })
      .subscribe(
        (apiResponse) => {
          this.blogs = apiResponse.data;
          this.totalPages = Math.ceil(apiResponse.total / this.itemsPerPage);
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
        (error) => {
          console.error('Error fetching blogs:', error);
        }
      );
  }

  /**
   * Delete a blog by its ID.
   * @param id - ID of the blog to be deleted.
   */
  private deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe(
      () => {
        this.toasterService.showSuccess('Success', 'Blog deleted successfully');
        if (this.blogs.length === 1 && this.currentPage != 1) {
          this.currentPage--; // Go to the previous page if the current page is empty
        }
        this.loadBlogs();
      },
      (error) => {
        console.error('Error deleting blog:', error);
      }
    );
  }

  /**
   * Change the current page and reload blogs.
   * @param page - The page number to navigate to.
   */
  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadBlogs();
  }

  /**
   * Open a confirmation modal for deleting a blog.
   * @param template - The template reference for the modal.
   * @param id - The ID of the blog to be deleted.
   */
  public openModal(template: TemplateRef<any>, id: string): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idToBeDeleted = id;
  }

  /**
   * Confirm the deletion of the blog.
   */
  public confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
    this.delete();
  }

  /**
   * Delete the blog and show a message in the console.
   */
  private delete(): void {
    this.deleteBlog(this.idToBeDeleted);
  }

  /**
   * Decline the deletion of the blog and hide the modal.
   */
  public decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
