import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  id: number;
  assignmentModel: Assignment = new Assignment(null, "", "", "", "", "", null, null, null, null);
  myTags: Tag[] = [];
  allTagsWithoutMine: Tag[] = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.id = +localStorage.getItem("assignmentID");

    this.appService.getAllTags().subscribe(result => {
      this.allTagsWithoutMine = result;

      this.appService.getAssignment(this.id).subscribe(result => {
        this.assignmentModel = result;
  
        result.assignmentTags.forEach(x => {

          this.myTags.push(x.tag);

          let tag = this.allTagsWithoutMine.find(t => t.name == x.tag.name);
          this.allTagsWithoutMine.splice(this.allTagsWithoutMine.indexOf(tag), 1);
        });
      });
    });
    
  }

  editAssignmentForm = this.fb.group({
    name: [this.assignmentModel.name, Validators.required],
    description: [this.assignmentModel.description, Validators.required],
    streetAdress: [this.assignmentModel.streetAdress, Validators.required],
    postalCode: [this.assignmentModel.postalCode, Validators.required]
  });

  removeTag(tag) {
    this.myTags.splice(this.myTags.indexOf(tag), 1);
    this.allTagsWithoutMine.push(tag);
  }

  addTag(tag) {
    this.myTags.push(tag);
    this.allTagsWithoutMine.splice(this.allTagsWithoutMine.indexOf(tag), 1);
  }

  onSubmit() {
    this.appService.editAssignment(this.assignmentModel).subscribe( result => {
      this.appService.addOrDeleteAssignmentTags(this.assignmentModel.assignmentID, this.myTags).subscribe( result2 => {
        this.router.navigateByUrl("/admin");
      });
    });
  }
}
