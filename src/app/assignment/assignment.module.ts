import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAssignmentComponent } from './search-assignment/search-assignment.component';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';



@NgModule({
  declarations: [SearchAssignmentComponent, AssignmentDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class AssignmentModule { }
