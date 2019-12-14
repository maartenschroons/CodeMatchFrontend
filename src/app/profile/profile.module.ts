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
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MakerDashboardComponent } from '../dashboard/maker-dashboard/maker-dashboard.component';
import { CompanyDashboardComponent } from '../dashboard/company-dashboard/company-dashboard.component';
import { InitialAssignmentsComponent } from '../dashboard/company-dashboard/initial-assignments/initial-assignments.component';
import { OngoingAssignmentsComponent } from '../dashboard/company-dashboard/ongoing-assignments/ongoing-assignments.component';
import { CompletedAssignmentsComponent } from '../dashboard/company-dashboard/completed-assignments/completed-assignments.component';
import { MakerOngoingComponent } from '../dashboard/maker-dashboard/maker-ongoing/maker-ongoing.component';
import { MakerCompletedComponent } from '../dashboard/maker-dashboard/maker-completed/maker-completed.component';



@NgModule({
  declarations: [
    OverviewComponent,
    ProfileComponent,
    ProfileEditComponent,
    AssignmentsComponent,
    TagsComponent,
    ReviewComponent,
    BekijkReviewComponent,DashboardComponent, MakerDashboardComponent, CompanyDashboardComponent, InitialAssignmentsComponent, OngoingAssignmentsComponent, CompletedAssignmentsComponent, MakerOngoingComponent, MakerCompletedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgbTooltipModule
  ]
})
export class ProfileModule { }
