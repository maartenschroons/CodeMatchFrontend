import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ongoing-assignments',
  templateUrl: './ongoing-assignments.component.html',
  styleUrls: ['./ongoing-assignments.component.scss']
})
export class OngoingAssignmentsComponent implements OnInit {

  assignments: Observable<Assignment[]>;
  assignmentsLength: number;
  decoded;
  companyID: number;
  
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.companyID = this.decoded["CompanyID"];

    this.assignments = this._appService.getAllInProgressAssignmentsByCompany(this.companyID);
    this.assignments.subscribe(result => { this.assignmentsLength = result.length});
  }


  ngOnInit() {
  }

  bekijkAssignment(assignment: Assignment) {
    //console.log(assignment);
    this._appService.gekozenAssignment.next(assignment);
    this.router.navigate(["detailAssignment"]);
 }

 complete(a: Assignment){
  a.status="Completed";
  this._appService.editAssignment(a).subscribe(result =>{this.instantiateLists()});
}
}
