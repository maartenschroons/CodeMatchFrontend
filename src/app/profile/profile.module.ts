import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { AssignmentsComponent } from './assignments/assignments.component';
import { TagsComponent } from './tags/tags.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewComponent } from './review/review.component';
import { BekijkReviewComponent } from './bekijk-review/bekijk-review.component';



@NgModule({
  declarations: [
    OverviewComponent,
    ProfileComponent,
    ProfileEditComponent,
    AssignmentsComponent,
    TagsComponent,
    ReviewComponent,
    BekijkReviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgbTooltipModule
  ]
})
export class ProfileModule { }
