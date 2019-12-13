import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../../models/notification.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Application } from 'src/app/models/application.model';
import { Company } from 'src/app/models/company.model';


@Component({
  selector: 'app-maker-application-notifications',
  templateUrl: './maker-application-notifications.component.html',
  styleUrls: ['./maker-application-notifications.component.scss']
})
export class MakerApplicationNotificationsComponent implements OnInit {
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

    this.notifications = this._appService.GetApplicationNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length;
      result.forEach(notification => {
        notification.read = true;
        this._appService.EditNotification(notification).subscribe();
      }); });
  
    this.readNotifications = this._appService.GetReadApplicationNotificationsByReceiver(this.userID);
    this.readNotifications.subscribe(result => { this.readNotificationsLength = result.length });
  }



  ngOnInit() {
  }


}
