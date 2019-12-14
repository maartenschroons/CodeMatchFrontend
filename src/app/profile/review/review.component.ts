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
  makerList: Maker[] = [];
  companyList: Company[] =[];
  reviewMaker: Maker;
  reviewCompany: Company;
  reviewAssignment: Assignment;

  constructor(private _appService: AppService, private router: Router) {
    //Get current userid
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    //Get the user and attributes
    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;
      this.isLoaded = true;
      //Fill in the list so only unique makers and companies appear in the front
      if (this.user.makerID) {
        let ids: number[] = [];
        let idsCompanies: number[] = [];
        this.user.maker.applications.forEach(x => {
          //Search all unique companies, which the user worked with
          if (!idsCompanies.includes(x.assignment.company.companyID)) {
            this.companyList.push(x.assignment.company);
            idsCompanies.push(x.assignment.company.companyID);
          }
          x.assignment.applications.forEach(y => {
            //Search all the unique makers the user worked with
            if (!ids.includes(y.maker.makerID)) {
              this.makerList.push(y.maker);
              ids.push(y.maker.makerID);
            }
            
          });
        });
        //When a company is logged in, only the maker list has to be adjusted
      } else {
        let ids: number[] = [];
        this.user.company.assignments.forEach(x => {
          x.applications.forEach(y => {
            if (!ids.includes(y.maker.makerID)) {
              this.makerList.push(y.maker);
              ids.push(y.maker.makerID);
            }
          });
        });
      }
    });
    
  }

  bekijkReview(any: any, id: number) {
    var bestaat: boolean;
    var description = null;
    //console.log(any);
    if (any.makerID && any.makerID != 0) {
      this.reviewMaker = any;
      this.reviewMaker.user.receivedReviews.forEach(x => {
        if (x.userIDSender == parseInt(this.userId.toString())) {
          bestaat= true;
          description = x.description;
        }
      });
      if (bestaat) {
        this._appService.receiverID.next({receiverid: this.reviewMaker.user.userID, name: this.reviewMaker.firstname, type: "maker", description: description});
      } else {
        this._appService.receiverID.next({receiverid: this.reviewMaker.user.userID, name: this.reviewMaker.firstname, type: "maker", description: ""});
      }
    } else {
      if (any.companyID && any.companyID != 0) {
        this.reviewCompany = any;
        this.reviewCompany.user.receivedReviews.forEach(x => {
          if (x.userIDSender == this.userId) {
            bestaat = true;
            description = x.description;
          }
        });
        if (bestaat) {
          this._appService.receiverID.next({receiverid: this.reviewCompany.user.userID, name: this.reviewCompany.name, type: "company",description: description});
        } else {
          this._appService.receiverID.next({receiverid: this.reviewCompany.user.userID, name: this.reviewCompany.name, type: "company",description: ""});
        }
      } else {
        if (any.assignmentID && any.assignmentID != 0) {
          this.reviewAssignment = any;
          //console.log(this.reviewAssignment);
          this.reviewAssignment.reviews.forEach(x => {
            if (x.userIDSender == this.userId) {
              bestaat = true;
              description = x.description;
            }
          });
          if (bestaat) {
            this._appService.receiverID.next({receiverid: this.reviewAssignment.assignmentID, name: this.reviewAssignment.name, type: "a",description: description});
          } else {
            this._appService.receiverID.next({receiverid: this.reviewAssignment.assignmentID, name: this.reviewAssignment.name, type: "a",description: ""});
          }
        }
      }
    }
    this.router.navigate(["bekijkReview"]);
  }

  ngOnInit() {
  }

}
