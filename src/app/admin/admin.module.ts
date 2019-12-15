import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAssignmentsComponent } from './admin-assignments/admin-assignments.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';



@NgModule({
  declarations: [AdminUsersComponent, AdminAssignmentsComponent, AdminReviewsComponent, EditAssignmentComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
