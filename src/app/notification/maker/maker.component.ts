import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-maker-notification',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.scss']
})
export class MakerComponent implements OnInit {

  reviewLength: number;
  applicationLength: number;
  assignmentLength: number;
  decoded;
  userID: number;
  
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this._appService.GetApplicationNotificationsByReceiver(this.userID).subscribe(result => { this.applicationLength = result.length});
    this._appService.GetReviewNotificationsByReceiver(this.userID).subscribe(result => { this.reviewLength = result.length});
    this._appService.GetAssignmentNotificationsByReceiver(this.userID).subscribe(result => { this.assignmentLength = result.length});
  }
  
  ngOnInit() {
  }

}
