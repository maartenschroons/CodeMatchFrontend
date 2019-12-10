import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { UserService } from '../services/user.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name: string;
notificationAmount: number= 1;
messageAmount: number= 2;
assignments: Observable<Assignment[]>;
appliedassignments: Observable<Assignment[]>;
assignmentsLength: number = 0;
appliedassignmentsLength: number =0;
makerCheck: boolean = false;
decoded;
userID: number;
  constructor(private router: Router, private _userService: UserService) { 
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];
    console.log(this.userID);
    this.instantiateLists()
  }

  instantiateLists(){
    this._userService.getUser(this.userID).subscribe(result => {this.name = result.email});
  }

  ngOnInit() {
  }

  goToNotification(){
    this.router.navigateByUrl('/notification');
  }

  goToMessages(){
    this.router.navigateByUrl('/');
  }

}
