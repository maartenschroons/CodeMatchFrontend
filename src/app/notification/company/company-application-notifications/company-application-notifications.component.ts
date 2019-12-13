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
    notification.application.assignment.status = "InProgress";
    
    let not = new NotificationDto(notification.receiver.userID, notification.sender.userID, 0, 0, notification.applicationID);

    this._appService.PostNotification(not).subscribe(result => {
      this._appService.EditNotification(notification).subscribe(result => {
        this._appService.editApplication(notification.application).subscribe(result => {
          this._appService.editAssignment(notification.application.assignment).subscribe(result => {
            this.instantiateLists()
          });
        });
      });
      //console.log(result);

    }, error => {
      alert(error);
    });;

  }

  decline(notification: Notification) {
    notification.read = true;
    notification.application.isAccepted = false;
  

    this._appService.EditNotification(notification).subscribe(result => {
      this._appService.editApplication(notification.application).subscribe(result => {

        this.instantiateLists()

      })
    });

  }
}
