import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReviewDto } from 'src/app/models/review-dto.model';
import * as jwt_decode from 'jwt-decode';
import { NotificationDto } from 'src/app/models/notification-dto.model';

@Component({
  selector: 'app-bekijk-review',
  templateUrl: './bekijk-review.component.html',
  styleUrls: ['./bekijk-review.component.scss']
})
export class BekijkReviewComponent implements OnInit {
  receiverID: { receiverid: number, type: String , name: String, description: String};
  public now: Date = new Date();
  reviewForm: FormGroup;
  submitted: boolean;
  reviewDto: ReviewDto = new ReviewDto(0, 0, 0, "");
  notificationDto: NotificationDto = new NotificationDto(0,0,0,0,0);
  userId: string;

  constructor(private _appService: AppService, private router: Router, private fb: FormBuilder) {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];
    this._appService.receiverID.subscribe(e => {
      this.receiverID = e;
      console.log(this.receiverID);
      
      if (this.receiverID.receiverid == 0) {
        this.router.navigate(["profile"]);
      }
    });
    setInterval(() => {
      this.now = new Date();
    }, 60000);
  }

  // Initialiseer het reviewForm
  ngOnInit() {
    this.reviewForm = this.fb.group({
      description: ["", Validators.required]
    })
  }
  get f() { return this.reviewForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
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
      //console.log(this.notificationDto);
      this._appService.PostNotification(this.notificationDto).subscribe(result => {
        this.router.navigate(["profile"]);
      }, error => {
        alert(error);
      });
    }, error => {
      alert(error);
    });
  }

}
