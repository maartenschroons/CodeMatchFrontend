import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

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
    this.notifications.subscribe(result => { this.notificationsLength = result.length});
  }

  ngOnInit() {
  }

}
