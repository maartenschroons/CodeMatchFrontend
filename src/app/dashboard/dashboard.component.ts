import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { UserService } from '../services/user.service';
import * as jwt_decode from 'jwt-decode';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name: string;
 
  makerCheck: boolean;
  decoded;
  role:string;
  userID: number;
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.role = this.decoded["role"];
    this.userID = this.decoded["UserID"];
    if (this.role == "Maker") {
      this.makerCheck = true;
    }
    else if (this.role == "Company") {
      this.makerCheck = false;
    }
    //console.log(this.decoded);
    this._appService.getUser(this.userID).subscribe(result => { this.name = result.email });
  }

  ngOnInit() {
  }

  goToNotification() {
    this.router.navigateByUrl('/notification');
  }

  goToMessages() {
    this.router.navigateByUrl('/');
  }

  toAddAssignment() {
    this.router.navigateByUrl('/addAssignment');
  }
}
