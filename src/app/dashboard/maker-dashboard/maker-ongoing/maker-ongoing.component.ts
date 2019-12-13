import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-maker-ongoing',
  templateUrl: './maker-ongoing.component.html',
  styleUrls: ['./maker-ongoing.component.scss']
})
export class MakerOngoingComponent implements OnInit {

  assignments: Observable<Assignment[]>;
  assignmentsLength: number;
  decoded;
  makerID: number;
  
  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.makerID = this.decoded["MakerID"];
    console.log(this.makerID);
    this.assignments = this._appService.getAllInProgressAssignmentsByMaker(this.makerID);
    this.assignments.subscribe(result => { this.assignmentsLength = result.length});
  }


  ngOnInit() {
  }

  bekijkAssignment(assignment: Assignment) {
    //console.log(assignment);
    this._appService.gekozenAssignment.next(assignment);
    this.router.navigate(["detailAssignment"]);
 }
 

}
