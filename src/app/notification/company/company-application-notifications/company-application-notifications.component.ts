import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import { NotificationKind } from 'rxjs/internal/Notification';
import { NotificationDto } from 'src/app/models/notification-dto.model';

@Component({
  selector: 'app-company-application-notifications',
  templateUrl: './company-application-notifications.component.html',
  styleUrls: ['./company-application-notifications.component.scss']
})
export class CompanyApplicationNotificationsComponent implements OnInit {

  notifications: Observable<Notification[]>;
  notificationsLength: number;
  decoded;
  userID: number;

  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this.notifications = this._appService.GetApplicationNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length });
  }

  ngOnInit() {
  }

  showMaker() {

  }

  accept(notification: Notification) {
    notification.read = true;
    notification.application.isAccepted = true;

    let not = new NotificationDto(notification.receiver, notification.sender, notification.assignmentID, notification.reviewID, notification.applicationID);


    this._appService.PostNotification(not).subscribe(result => {
      this._appService.EditNotification(notification).subscribe(result => {
        this._appService.editApplication(notification.application).subscribe(result => { this.instantiateLists() });
      });
      //console.log(result);
      alert("You successfully applied! Now wait for the company to go over your application.");
    }, error => {
      alert(error);
    });;

  }

  decline(notification: Notification) {
    notification.read = true;
    notification.application.isAccepted = false;

    this._appService.EditNotification(notification).subscribe(result => { this._appService.editApplication(notification.application).subscribe(result => { this.instantiateLists() }) });

  }
}
