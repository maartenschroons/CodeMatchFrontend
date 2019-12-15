import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MakerComponent } from './maker/maker.component';
import { CompanyComponent } from './company/company.component';
import { MakerAssignmentNotificationsComponent } from './maker/maker-assignment-notifications/maker-assignment-notifications.component';
import { MakerApplicationNotificationsComponent } from './maker/maker-application-notifications/maker-application-notifications.component';
import { MakerReviewNotificationsComponent } from './maker/maker-review-notifications/maker-review-notifications.component';
import { CompanyApplicationNotificationsComponent } from './company/company-application-notifications/company-application-notifications.component';
import { CompanyReviewNotificationsComponent } from './company/company-review-notifications/company-review-notifications.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { }
