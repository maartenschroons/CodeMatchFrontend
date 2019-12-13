import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { AppService } from 'src/app/services/app.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-assignments',
  templateUrl: './admin-assignments.component.html',
  styleUrls: ['./admin-assignments.component.scss']
})
export class AdminAssignmentsComponent implements OnInit {
  assignments: Observable<Assignment[]>;
  assignmentFilter: Observable<Assignment[]>;

  constructor(private _appService: AppService) {
    this.instantiateLists();
  }

  instantiateLists() {
    this.assignments = this._appService.getAllAssignments();
    this.assignmentFilter = this._appService.getAllAssignments();
  }

  ngOnInit() {
  }

  search(name: string) {
    this.assignmentFilter.pipe(map(assignment =>
      assignment.filter(assignment =>
        assignment.name.toLowerCase().includes(name)
      ))).subscribe(result => {
        this.assignments = of(result);
      })
  }

}
