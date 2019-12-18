import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import { NotificationDto } from 'src/app/models/notification-dto.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-company-application-notifications',
  templateUrl: './company-application-notifications.component.html',
  styleUrls: ['./company-application-notifications.component.scss']
})
export class CompanyApplicationNotificationsComponent implements OnInit {

  notifications: Observable<Notification[]>;
  notificationsLength: number;
  readNotifications: Observable<Notification[]>;
  readNotificationsLength: number;
  decoded;
  userID: number;
  closeResult: string;
  user: User;
  accepted: boolean;

  constructor(private router: Router, private _appService: AppService, private modalService: NgbModal) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this.notifications = this._appService.GetApplicationNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length });

    this.readNotifications = this._appService.GetReadApplicationNotificationsByCompany(this.userID);
    this.readNotifications.subscribe(result => {this.readNotificationsLength= result.length});
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
  open(content, user: User, accept:boolean) {
    this.accepted = accept;
    this.user = user;
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
