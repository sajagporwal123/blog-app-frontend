import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListingComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateBlogComponent,
  },
  {
    path: ':id',
    component: BlogDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
