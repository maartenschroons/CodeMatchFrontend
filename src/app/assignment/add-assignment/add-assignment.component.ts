import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { Assignment } from 'src/app/models/assignment.model';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: []
})
export class AddAssignmentComponent implements OnInit {

  assignmentModel: Assignment = new Assignment(0, "", "", "", "", "", null, null, null, null);
  decoded;
  userID: number;
  user: User;
  myTags: Tag[] = [];
  allTagsWithoutMine: Tag[] = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getAllTags().subscribe(result => {
      this.allTagsWithoutMine = result;
    });

    this.decoded = jwt_decode(localStorage.getItem("token"));
    this.userID = this.decoded["UserID"];

    this.appService.getUserById(this.userID).subscribe(result => {
      this.user = result;
    });
  }

  addAssignmentForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    streetAdress: ['', Validators.required],
    postalCode: ['', Validators.required]
  });

  removeTag(tag) {
    this.myTags.splice(this.myTags.indexOf(tag), 1);
    this.allTagsWithoutMine.push(tag);
  }

  addTag(tag) {
    this.myTags.push(tag);
    this.allTagsWithoutMine.splice(this.allTagsWithoutMine.indexOf(tag), 1);
  }

  onSubmit()
  {
    this.assignmentModel.assignmentID = 0;
    this.assignmentModel.company = this.user.company;
    this.assignmentModel.status = "Initial";

    this.appService.addAssignment(this.assignmentModel).subscribe(result => {
      this.appService.addAssignmentTags(result.assignmentID, this.myTags).subscribe(result2 => {
        this.router.navigateByUrl("/profile");
      });
    });
  }
}
