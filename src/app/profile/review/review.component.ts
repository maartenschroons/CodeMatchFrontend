import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Company } from 'src/app/models/company.model';
import { Maker } from 'src/app/models/maker.model';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  user: User;
  userId: number;
  isLoaded: boolean = false;
  reviewMaker: Maker;
  reviewCompany: Company;
  reviewAssignment: Assignment;

  constructor(private _appService: AppService, private router: Router) {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;
      this.isLoaded = true;
      //console.log(this.user);
    });
  }

  bekijkReview(any: any) {
    console.log(any);
    if (any.makerID) {
      this.reviewMaker = any;
      this._appService.receiverID.next({receiverid: this.reviewMaker.makerID, type: "maker"});
    } else {
      if (any.companyID) {
        this.reviewCompany = any;
        this._appService.receiverID.next({receiverid: this.reviewCompany.companyID, type: "company"});
      } else {
        if (any.assignmentID) {
          this.reviewAssignment = any;
          this._appService.receiverID.next({receiverid: this.reviewAssignment.assignmentID, type: "assignment"});
        }
      }
    }
    
    
    this.router.navigate(["bekijkReview"]);
  }

  ngOnInit() {
  }

}
