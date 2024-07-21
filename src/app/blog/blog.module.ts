import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogRoutingModule } from './blog-routing.module';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [
    CreateBlogComponent,
    ListingComponent,
    TruncatePipe,
    BlogDetailsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ModalModule.forRoot(),
  ],
  providers: [],
})
export class BlogModule {}
