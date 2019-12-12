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
  notificationAmount: number = 1;
  messageAmount: number = 2;
  assignments: Observable<Assignment[]>;
  appliedassignments: Observable<Assignment[]>;
  assignmentsLength: number;
  appliedassignmentsLength: number;
  makerCheck: boolean = false;
  decoded;
  companyID: number;
  makerID: number;
  userID: number;
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.companyID = this.decoded["CompanyID"];
    this.makerID = this.decoded["MakerID"];
    if (this.makerID != null) {
      this.makerCheck = true;
      this.assignments = this._appService.getAllInProgressAssignmentsByMaker(this.makerID);
      this._appService.getAllInProgressAssignmentsByMaker(this.makerID).subscribe(result => { this.assignmentsLength = result.length;console.log(result) });
      this.appliedassignments = this._appService.getAllCompletedAssignmentsByMaker(this.makerID);
      this._appService.getAllCompletedAssignmentsByMaker(this.makerID).subscribe(result => { this.appliedassignmentsLength = result.length })
    }
    else if (this.companyID != null) {
      this.makerCheck = false;
      this.assignments = this._appService.getAllInitialAssignmentsByCompany(this.companyID);
      this._appService.getAllInitialAssignmentsByCompany(this.companyID).subscribe(result => { this.assignmentsLength = result.length;console.log(result) });
      this.appliedassignments = this._appService.getAllInProgressAssignmentsByCompany(this.companyID);
      this._appService.getAllInProgressAssignmentsByCompany(this.companyID).subscribe(result => { this.appliedassignmentsLength = result.length })
      
    }
    this.userID = this.decoded["UserID"];

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

}
