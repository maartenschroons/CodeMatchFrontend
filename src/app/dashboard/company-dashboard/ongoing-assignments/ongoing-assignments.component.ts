import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import * as jwt_decode from 'jwt-decode';
import { NotificationDto } from 'src/app/models/notification-dto.model';

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
  userID: number;

  constructor(private router: Router, private _appService: AppService) {
    this.instantiateLists()
  }
  instantiateLists() {
    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.companyID = this.decoded["CompanyID"];
    this.userID = this.decoded["UserID"];

    this.assignments = this._appService.getAllInProgressAssignmentsByCompany(this.companyID);
    this.assignments.subscribe(result => { this.assignmentsLength = result.length });
  }


  ngOnInit() {
  }

  bekijkAssignment(assignment: Assignment) {
    //console.log(assignment);
    this._appService.gekozenAssignment.next(assignment);
    this.router.navigate(["detailAssignment"]);
  }

  complete(a: Assignment) {
    a.status = "Completed";
    this._appService.editAssignment(a).subscribe(result => {
      a.applications.forEach(application => {
        let not = new NotificationDto(this.userID, application.makerID, a.assignmentID, 0, 0);
        this._appService.PostNotification(not).subscribe();
      }); 
      this.instantiateLists()
    });


  }
}
