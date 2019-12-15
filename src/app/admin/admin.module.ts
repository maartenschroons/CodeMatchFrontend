import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAssignmentsComponent } from './admin-assignments/admin-assignments.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { DirectivesModule } from '../directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';



@NgModule({
  declarations: [
    AdminUsersComponent, 
    AdminAssignmentsComponent, 
    AdminReviewsComponent, 
    AdminEditUserComponent,
    UserEditComponent,
    TagEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class AdminModule { }
