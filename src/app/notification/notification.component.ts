import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import * as jwt_decode from 'jwt-decode';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  AssignmentnotificationsLength: number;
  Assignmentnotifications: Observable<Notification[]>;
  ReviewnotificationsLength: number;
  Reviewnotifications: Observable<Notification[]>;
  ParticipationnotificationsLength: number;
  Participationnotifications: Observable<Notification[]>;
  decoded;
  companyID: number;
  makerID: number;
  userID: number;

  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists();
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.companyID = this.decoded["CompanyID"];
    this.makerID = this.decoded["MakerID"];
    this.userID = this.decoded["UserID"];
    if (this.makerID != null) {
      this.Assignmentnotifications = this._appService.GetAssignmentNotificationsByReceiver(this.userID);
      this.Assignmentnotifications.subscribe(result => { this.AssignmentnotificationsLength = result.length });

      this.Reviewnotifications = this._appService.GetReviewNotificationsByReceiver(this.userID);
      this.Reviewnotifications.subscribe(result => { this.ReviewnotificationsLength = result.length });

      this.Participationnotifications = this._appService.GetApplicationNotificationsByReceiver(this.userID);
      this.Participationnotifications.subscribe(result => { this.ParticipationnotificationsLength = result.length });

    }
    else if (this.companyID != null) {
      this.Participationnotifications = this._appService.GetApplicationNotificationsByReceiver(this.userID);
      this.Participationnotifications.subscribe(result => { this.ParticipationnotificationsLength = result.length });
    }
    console.log(this.Reviewnotifications);

  }

  ngOnInit() {
  }

}
