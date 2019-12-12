import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { SearchAssignmentComponent } from './assignment/search-assignment/search-assignment.component';
import { ProfileModule } from './profile/profile.module';
import { OverviewComponent } from './profile/overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security.interceptor';
import { AssignmentModule } from './assignment/assignment.module';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AssignmentDetailsComponent } from './assignment/assignment-details/assignment-details.component';
import { MakerDashboardComponent } from './dashboard/maker-dashboard/maker-dashboard.component';
import { CompanyDashboardComponent } from './dashboard/company-dashboard/company-dashboard.component';
import { InitialAssignmentsComponent } from './dashboard/company-dashboard/initial-assignments/initial-assignments.component';
import { OngoingAssignmentsComponent } from './dashboard/company-dashboard/ongoing-assignments/ongoing-assignments.component';
import { CompletedAssignmentsComponent } from './dashboard/company-dashboard/completed-assignments/completed-assignments.component';
import { MakerCompletedComponent } from './dashboard/maker-dashboard/maker-completed/maker-completed.component';
import { MakerOngoingComponent } from './dashboard/maker-dashboard/maker-ongoing/maker-ongoing.component';
import { MakerComponent } from './notification/maker/maker.component';
import { MakerReviewNotificationsComponent } from './notification/maker/maker-review-notifications/maker-review-notifications.component';
import { MakerApplicationNotificationsComponent } from './notification/maker/maker-application-notifications/maker-application-notifications.component';
import { MakerAssignmentNotificationsComponent } from './notification/maker/maker-assignment-notifications/maker-assignment-notifications.component';
import { CompanyComponent } from './notification/company/company.component';
import { CompanyApplicationNotificationsComponent } from './notification/company/company-application-notifications/company-application-notifications.component';
import { CompanyReviewNotificationsComponent } from './notification/company/company-review-notifications/company-review-notifications.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: OverviewComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'searchAssignment', component: SearchAssignmentComponent},
  { path: 'detailAssignment', component: AssignmentDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotificationComponent,
    MakerDashboardComponent,
    CompanyDashboardComponent,
    InitialAssignmentsComponent,
    OngoingAssignmentsComponent,
    CompletedAssignmentsComponent,
    MakerCompletedComponent,
    MakerOngoingComponent,
    MakerComponent,
    MakerReviewNotificationsComponent,
    MakerApplicationNotificationsComponent,
    MakerAssignmentNotificationsComponent,
    CompanyComponent,
    CompanyApplicationNotificationsComponent,
    CompanyReviewNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProfileModule,
    HttpClientModule,
    AssignmentModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
