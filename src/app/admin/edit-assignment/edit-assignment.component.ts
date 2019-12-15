import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  id: number;
  assignmentModel: Assignment = new Assignment(null, "", "", "", "", "", null, null, null, null);

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.id = +localStorage.getItem("assignmentID");

    this.appService.getAssignment(this.id).subscribe(result => {
      this.assignmentModel = result;
    });
  }

  editAssignmentForm = this.fb.group({
    name: [this.assignmentModel.name, Validators.required],
    description: [this.assignmentModel.description, Validators.required],
    streetAdress: [this.assignmentModel.streetAdress, Validators.required],
    postalCode: [this.assignmentModel.postalCode, Validators.required]
  });

  onSubmit() {
    this.appService.editAssignment(this.assignmentModel).subscribe( result => {
      this.router.navigateByUrl("/admin");
    });
  }
}
