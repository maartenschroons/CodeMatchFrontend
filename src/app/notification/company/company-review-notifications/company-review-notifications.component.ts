import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-company-review-notifications',
  templateUrl: './company-review-notifications.component.html',
  styleUrls: ['./company-review-notifications.component.scss']
})
export class CompanyReviewNotificationsComponent implements OnInit {

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

    this.notifications = this._appService.GetReviewNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length});
  }

  ngOnInit() {
  }

}
