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
  check: boolean;
  decoded;
  role:string;
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists();
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.role = this.decoded["role"];
  
    if (this.role == "Maker") {
      this.check = true;
    }
    else if (this.role == "Company") {
      this.check = false;
    }
  }

  ngOnInit() {
  }

}
