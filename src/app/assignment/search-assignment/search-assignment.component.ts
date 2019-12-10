import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.scss']
})
export class SearchAssignmentComponent implements OnInit {
  assignments: Assignment[];

  constructor(private _appService: AppService) {
    this._appService.getAllAssignments().subscribe(result => {
      console.log(result);
      this.assignments = result;
      console.log(this.assignments);
    });
   }

  ngOnInit() {
  }

}
