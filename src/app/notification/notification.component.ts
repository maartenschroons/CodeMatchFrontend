import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationLength: number = 0;
  notifications: Observable<Notification[]>;
  constructor() { }

  ngOnInit() {
  }

}
