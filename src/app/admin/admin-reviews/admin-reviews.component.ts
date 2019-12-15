import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  user: User;
  sentReviews: Observable<Review[]>;
  sentReviewsLength: number;
  receivedReviews: Observable<Review[]>;
  receivedReviewsLength: number;

  constructor(private _appService: AppService, private router: Router) {
    this.instantiateLists();
  }

  instantiateLists() {
    this._appService.gekozenUser.subscribe(e => {
      this.user = e;
      //console.log(this.assignment);
      // Als er gerefresht wordt dan is de poll leeg -> stuur terug naar poll component
      if (this.user.userID == 0) {
        this.router.navigate(["admin"]);
      }
    });
    this.sentReviews = this._appService.getAllReviewsBySender(this.user.userID);
    this.sentReviews.subscribe(result => { 
      this.sentReviewsLength = result.length ;

    });


    this.receivedReviews = this._appService.getAllReviewsByReceiver(this.user.userID);
    this.receivedReviews.subscribe(result => { this.receivedReviewsLength = result.length });
  }

  ngOnInit() {
  }

  update(review: Review) {
    console.log(review);
    if (review.receiver != null) {
      this._appService.receiverID.next({receiverid: review.reviewID, name: review.receiver.email, type: "admin",description: review.description});  
    } else {
      this._appService.receiverID.next({receiverid: review.reviewID, name: review.assignment.name, type: "admin",description: review.description});  
    }
      
      this.router.navigate(["bekijkReview"]);  
  }

  delete(review: Review){
    this._appService.deleteReview(review.reviewID).subscribe(result =>{this.instantiateLists()});
  }
}
