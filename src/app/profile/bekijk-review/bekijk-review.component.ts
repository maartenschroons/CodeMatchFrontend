import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReviewDto } from 'src/app/models/review-dto.model';
import * as jwt_decode from 'jwt-decode';
import { NotificationDto } from 'src/app/models/notification-dto.model';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-bekijk-review',
  templateUrl: './bekijk-review.component.html',
  styleUrls: ['./bekijk-review.component.scss']
})
export class BekijkReviewComponent implements OnInit {
  receiverID: { receiverid: number, type: String, name: String, description: String };
  public now: Date = new Date();
  reviewForm: FormGroup;
  submitted: boolean;
  reviewDto: ReviewDto = new ReviewDto(0, 0, 0, "");
  notificationDto: NotificationDto = new NotificationDto(0, 0, 0, 0, 0);
  userId: string;
  role:string;

  constructor(private _appService: AppService, private router: Router, private fb: FormBuilder) {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.role=decodedToken['role'];
    this.userId = decodedToken['UserID'];
    this.reviewForm = this.fb.group({
      description: ["", Validators.required]
    });
    this._appService.receiverID.subscribe(e => {
      this.receiverID = e;
      //console.log(this.receiverID);

      if (this.receiverID.receiverid == 0) {
        this.router.navigate(["profile"]);
      }
      if (this.receiverID.type == "admin") {
        this.reviewForm.patchValue({
          description: this.receiverID.description
        })
      }
    });
    setInterval(() => {
      this.now = new Date();
    }, 60000);
  }

  // Initialiseer het reviewForm
  ngOnInit() {
    
  }
  get f() { return this.reviewForm.controls; }

  back() {
    this.router.navigate(["profile"]);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
    if (this.receiverID.type == "admin") {
      let review = new Review(this.receiverID.receiverid,this.reviewForm.value.description,null,0,null,0,null);
      this._appService.updateReview(this.receiverID.receiverid,review).subscribe(result => {
        this.router.navigate(["admin"]);
      }, error => {
        alert(error);
      });
    } else {
      this.reviewDto.description = this.reviewForm.value.description;
      this.reviewDto.senderID = parseInt(this.userId);
  
      this.notificationDto.senderID = parseInt(this.userId);
      if (this.receiverID.type == "a") {
        this.reviewDto.assignmentID = this.receiverID.receiverid;
      } else {
        this.reviewDto.receiverID = this.receiverID.receiverid;
        this.notificationDto.receiverID = this.receiverID.receiverid;
      }
      //console.log(this.reviewDto);
      this._appService.addReview(this.reviewDto).subscribe(result => {
        alert("Review toegevoegd!");
        this.notificationDto.reviewID = result.reviewID;
        if (this.receiverID.type != "a") {
          //console.log(this.notificationDto);
          this._appService.PostNotification(this.notificationDto).subscribe(result => {
  
            this.router.navigate(["profile"]);
          }, error => {
            alert(error);
          });
        } else if (this.receiverID.type == "a") {
          this._appService.getAssignmentByID(result.assignmentID).subscribe(result => {
            //console.log(result.applications);
            result.applications.forEach(application => {
              if (parseInt(this.userId) != application.maker.makerID && application.isAccepted) {
                this.notificationDto.receiverID = application.maker.user.userID;
                this._appService.PostNotification(this.notificationDto).subscribe(result => {
                }, error => {
                  alert(error);
                });
              } if (this.role!="Company") {
                this.notificationDto.receiverID = result.company.user.userID;
                this._appService.PostNotification(this.notificationDto).subscribe(result => {
  
                }, error => {
                  alert(error);
                });
              }
              this.router.navigate(["profile"]);
            });
  
  
          })
        }
      }, error => {
        alert(error);
      });
    }
    
  }

}
