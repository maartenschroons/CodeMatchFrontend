import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/app/models/review.model';


@Component({
  selector: 'app-maker-review-notifications',
  templateUrl: './maker-review-notifications.component.html',
  styleUrls: ['./maker-review-notifications.component.scss']
})
export class MakerReviewNotificationsComponent implements OnInit {
  closeResult: string;
  notifications: Observable<Notification[]>;
  readNotifications: Observable<Notification[]>;
  notificationsLength: number;
  readNotificationsLength: number;
  decoded;
  userID: number;
  review: Review;
  
  constructor(private router: Router, private _appService: AppService, private modalService: NgbModal) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this.notifications = this._appService.GetReviewNotificationsByReceiver(this.userID);
    this.notifications.subscribe(result => { this.notificationsLength = result.length;
      result.forEach(notification => {
        notification.read = true;
        this._appService.EditNotification(notification).subscribe();
      });});
 
    this.readNotifications = this._appService.GetReadReviewNotificationsByReceiver(this.userID);
    this.readNotifications.subscribe(result => { this.readNotificationsLength = result.length });
  }

  ngOnInit() {
  }
  open(content, review: Review) {
    this.review = review;
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
