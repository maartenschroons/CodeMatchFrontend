import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { ApplicationDto } from 'src/app/models/application-dto.model';
import * as jwt_decode from 'jwt-decode';
import { NotificationDto } from 'src/app/models/notification-dto.model';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss']
})
export class AssignmentDetailsComponent implements OnInit {
  assignment: Assignment;
  applicationDto: ApplicationDto;
  makerID: number;
  companyID: string;
  userID: string;
  role:string;
  alreadyApplied: boolean;
  companyIsViewing: boolean;
  public now: Date = new Date();  

  constructor(private _appService: AppService, private router: Router) {
    var decoded = jwt_decode(localStorage.getItem("token"));
    this.makerID = decoded["MakerID"];
    this.userID = decoded["UserID"];
    this.role = decoded["role"];
    if (this.role == "Company") {
      this.companyIsViewing = true;
    }
    else{
      this.companyIsViewing = false;
    }
    

    this._appService.gekozenAssignment.subscribe(e=> {
      this.assignment = e;
      // Als er gerefresht wordt dan is de poll leeg -> stuur terug naar poll component
      if (this.assignment.assignmentID == 0) {
        this.router.navigate(["profile"]);
      }
  });
  setInterval(() => {
    this.now = new Date();
  }, 60000);
  this.checkIfAlreadyApplied();
  }

  checkIfAlreadyApplied() {
    this.assignment.applications.forEach(a => {
      if (a.makerID == this.makerID) {
        this.alreadyApplied = true;
      } 
    });
    console.log(this.alreadyApplied);
  }

  back() {
    this.router.navigate(["profile"]);
  }

  applyForAssignment() {
    this.applicationDto = new ApplicationDto(this.makerID,this.assignment,false);
    this._appService.postNewApplication(this.applicationDto).subscribe(result => {

      alert("You successfully applied! Now wait for the company to go over your application.");
      let notificationDto: NotificationDto = new NotificationDto(parseInt(this.userID),this.assignment.company.user.userID,0,0,result.applicationID);
      this._appService.PostNotification(notificationDto).subscribe(result => {
      }, error => {
        alert(error);
      });
      this.router.navigate(["searchAssignment"]);
    }, error => {
      alert(error);
    });
  }

  ngOnInit() {
  }

}
