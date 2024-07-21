import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Blog } from '../models/blog.model';

/**
 * BlogService is responsible for handling blog-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = `${environment.API_URL}/blogs`;

  /**
   * Constructor to inject HttpClient service.
   * @param http - HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of blogs with optional query parameters.
   * @param queryParams - Optional query parameters to filter the blogs.
   * @returns An observable containing the list of blogs and the total count.
   */
  getBlogs(queryParams: any): Observable<{ data: Blog[]; total: number }> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      params = params.append(key, queryParams[key]);
    });
    return this.http.get<{ data: Blog[]; total: number }>(this.apiUrl, {
      params,
    });
  }

  /**
   * Fetches the details of a specific blog by ID.
   * @param id - The ID of the blog.
   * @returns An observable containing the blog details.
   */
  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new blog.
   * @param blogData - The data of the blog to be created.
   * @returns An observable containing the created blog.
   */
  createBlog(blogData: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blogData);
  }

  /**
   * Updates an existing blog by ID.
   * @param id - The ID of the blog to be updated.
   * @param blogData - The updated data of the blog.
   * @returns An observable containing the updated blog.
   */
  updateBlog(id: string, blogData: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blogData);
  }

  /**
   * Deletes a blog by ID.
   * @param id - The ID of the blog to be deleted.
   * @returns An observable containing the deleted blog.
   */
  deleteBlog(id: string): Observable<Blog> {
    return this.http.delete<Blog>(`${this.apiUrl}/${id}`);
  }
}
