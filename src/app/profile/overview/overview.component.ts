import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  notificationAmount: number;
  decoded;
  userID: number;

  constructor(private _appService: AppService) { 
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];
    this._appService.GetNotificationsByReceiver(this.userID).subscribe(result => { this.notificationAmount = result.length });
  }

  ngOnInit() {
  }

}
