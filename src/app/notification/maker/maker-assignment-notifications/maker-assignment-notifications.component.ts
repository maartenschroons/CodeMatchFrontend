import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Notification } from '../../../models/notification.model';

@Component({
  selector: 'app-maker-assignment-notifications',
  templateUrl: './maker-assignment-notifications.component.html',
  styleUrls: ['./maker-assignment-notifications.component.scss']
})
export class MakerAssignmentNotificationsComponent implements OnInit {

  notifications: Observable<Notification[]>;
  readNotifications: Observable<Notification[]>;
  notificationsLength: number;
  readNotificationsLength: number;
  decoded;
  userID: number;
  
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this.notifications = this._appService.GetAssignmentNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length;
      result.forEach(notification => {
        notification.read = true;
        this._appService.EditNotification(notification).subscribe();
      });});

    this.readNotifications = this._appService.GetReadAssignmentNotificationsByReceiver(this.userID);
    this.readNotifications.subscribe(result => { this.readNotificationsLength = result.length });
  }

  ngOnInit() {
  }

}
