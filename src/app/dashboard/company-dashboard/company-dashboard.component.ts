import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  assignments: Observable<Assignment[]>;
  appliedassignments: Observable<Assignment[]>;
  assignmentsLength: number;
  appliedassignmentsLength: number;
  decoded;
  companyID: number;
  makerID: number;

  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.companyID = this.decoded["CompanyID"];

    this.assignments = this._appService.getAllInitialAssignmentsByCompany(this.companyID);
    this._appService.getAllInitialAssignmentsByCompany(this.companyID).subscribe(result => { this.assignmentsLength = result.length});
    this.appliedassignments = this._appService.getAllInProgressAssignmentsByCompany(this.companyID);
    this._appService.getAllInProgressAssignmentsByCompany(this.companyID).subscribe(result => { this.appliedassignmentsLength = result.length })

  }

  ngOnInit() {
  }

}
