import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-maker-dashboard',
  templateUrl: './maker-dashboard.component.html',
  styleUrls: ['./maker-dashboard.component.scss']
})
export class MakerDashboardComponent implements OnInit {
  assignments: Observable<Assignment[]>;
  appliedassignments: Observable<Assignment[]>;
  assignmentsLength: number;
  appliedassignmentsLength: number;
  decoded;
  makerID: number;
  userID: number;

  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }

  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.makerID = this.decoded["MakerID"];
    this.userID = this.decoded["UserID"];

    this.assignments = this._appService.getAllInProgressAssignmentsByMaker(this.makerID);
    this._appService.getAllInProgressAssignmentsByMaker(this.makerID).subscribe(result => { this.assignmentsLength = result.length; console.log(result) });
    this.appliedassignments = this._appService.getAllCompletedAssignmentsByMaker(this.makerID);
    this._appService.getAllCompletedAssignmentsByMaker(this.makerID).subscribe(result => { this.appliedassignmentsLength = result.length })

  }

  ngOnInit() {
  }

}
