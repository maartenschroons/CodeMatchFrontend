import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-company-notification',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  reviewLength: number;
  applicationLength: number;
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
   }
  

  ngOnInit() {
  }

}
