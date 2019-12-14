import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAssignmentComponent } from './search-assignment/search-assignment.component';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SearchAssignmentComponent, AssignmentDetailsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AssignmentModule { }
