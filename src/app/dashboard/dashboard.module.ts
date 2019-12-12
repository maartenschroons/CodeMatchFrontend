import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MakerDashboardComponent } from './maker-dashboard/maker-dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { InitialAssignmentsComponent } from './company-dashboard/initial-assignments/initial-assignments.component';
import { OngoingAssignmentsComponent } from './company-dashboard/ongoing-assignments/ongoing-assignments.component';
import { CompletedAssignmentsComponent } from './company-dashboard/completed-assignments/completed-assignments.component';
import { MakerOngoingComponent } from './maker-dashboard/maker-ongoing/maker-ongoing.component';
import { MakerCompletedComponent } from './maker-dashboard/maker-completed/maker-completed.component';



@NgModule({
  declarations: [DashboardComponent, MakerDashboardComponent, CompanyDashboardComponent, InitialAssignmentsComponent, OngoingAssignmentsComponent, CompletedAssignmentsComponent, MakerOngoingComponent, MakerCompletedComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
