import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Assignment } from 'src/app/models/assignment.model';
import * as jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.model';
import { UserWithPermissions } from 'src/app/models/user-with-permissions.model';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null, null, null, null, null, null, null);
  userWithPermissions: UserWithPermissions = new UserWithPermissions('', []);
  assignmentsComplete: Assignment[] = [];
  assignmentsInProgress: Assignment[] = [];
  assignmentsInitial: Assignment[] = [];
  isLoaded: boolean = false;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    let userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(userId).subscribe(result => {
      this.user = result;
      this.isLoaded = true;

      if (this.user.makerID) {
        this.getCompletedAssignmentsMaker(this.user.makerID);
        this.getInProgressAssignmentsMaker(this.user.makerID);
      }

      if(this.user.companyID) {
        this.getCompletedAssignmentsCompany(this.user.companyID);
        this.getInProgressAssignmentsCompany(this.user.companyID);
        this.getInitialAssignmentsCompanny(this.user.companyID);
      }

      this.userWithPermissions.email = result.email;
      result.role.rolePermissions.forEach(x => {
        this.userWithPermissions.permission.push(x.permission.name);
      });
      this._appService.setUserPermissions(this.userWithPermissions);
    });
  }

  getCompletedAssignmentsMaker(id: number) {
    this._appService.getAllCompletedAssignmentsByMaker(id).subscribe(result => {
      this.assignmentsComplete = result;
    });
  }

  getInProgressAssignmentsMaker(id: number) {
    this._appService.getAllInProgressAssignmentsByMaker(id).subscribe(result => {
      this.assignmentsInProgress = result;
    })
  }

  getCompletedAssignmentsCompany(id: number) {
    this._appService.getAllCompletedAssignmentsByCompany(id).subscribe(result => {
      this.assignmentsComplete = result;
    })
  }

  getInProgressAssignmentsCompany(id: number) {
    this._appService.getAllInProgressAssignmentsByCompany(id).subscribe(result => {
      this.assignmentsInProgress = result;
    })
  }

  getInitialAssignmentsCompanny(id: number) {
    this._appService.getAllInitialAssignmentsByCompany(id).subscribe(result => {
      this.assignmentsInitial = result;
    })
  }

}
