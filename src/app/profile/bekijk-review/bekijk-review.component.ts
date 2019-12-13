import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReviewDto } from 'src/app/models/review-dto.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-bekijk-review',
  templateUrl: './bekijk-review.component.html',
  styleUrls: ['./bekijk-review.component.scss']
})
export class BekijkReviewComponent implements OnInit {
  receiverID: {receiverid: number, type: String};
  public now: Date = new Date();
  reviewForm: FormGroup;
  submitted: boolean;
  reviewDto: ReviewDto = new ReviewDto(0,0,0);
  userId: number;

  constructor(private _appService: AppService, private router: Router, private fb: FormBuilder) { 
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];
    this._appService.receiverID.subscribe(e=> {
      this.receiverID = e;
      // Als er gerefresht wordt dan is de Receiver leeg -> stuur terug naar profile component
      if (this.receiverID.receiverid == 0) {
        this.router.navigate(["profile"]);
      }
  });
  setInterval(() => {
    this.now = new Date();
  }, 60000);
  }

  // Initialiseer het vriendForm
  ngOnInit() {
    this.reviewForm = this.fb.group({
      description: ["", Validators.required]
    })
  }
  get f() { return this.reviewForm.controls; }

  // Als ik een vriend toevoeg controleer of het valide is, Stuur daarna het verzoek
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
    console.log(this.reviewForm);
  }

}
