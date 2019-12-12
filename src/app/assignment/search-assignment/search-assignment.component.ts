import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Tag } from 'src/app/models/tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.scss']
})
export class SearchAssignmentComponent implements OnInit {
  assignments: Assignment[];
  filterdAssignments: Assignment[] = [];
  filter = [];
  tags: Tag[];

  constructor(private _appService: AppService, private router: Router) {
    this.getAllAssignments();
    this.getAllTags();
   }

   // Haal alle assignments op
   getAllAssignments() {
    this._appService.getAllAssignments().subscribe(result => {
      this.assignments = result;
      console.log(this.assignments);
    });
   }

   getAllTags() {
     this._appService.getAllTags().subscribe(result => {
       this.tags = result;
       //console.log(this.tags);
     })
   }

   bekijkAssignment(assignment: Assignment) {
      //console.log(assignment);
      this._appService.gekozenAssignment.next(assignment);
      this.router.navigate(["detailAssignment"]);
   }

  ngOnInit() {
  }

  onCheckChange(event) {
    if(event.target.checked){
      // Add a new filterValue to the filter
      this.filter.push(event.target.value);
    }
    /* unselected */
    else{
      // find the unselected element
      var index = this.filter.indexOf(event.target.value);
      if (index > -1) {
        this.filter.splice(index,1);
      }
      
      if (this.filter.length == 0) {
        this.filterdAssignments.length =0;
      }
    }
    this.assignments.forEach(a => {
      var tagsVanAssignment = [];
      a.assignmentTags.forEach(t => {
          tagsVanAssignment.push(t.tag.name);
      });
      let teller: number =0;
      this.filter.forEach(f => {
        if (tagsVanAssignment.includes(f)) {
          teller++;
        }
      });
      if (teller == this.filter.length && !this.filterdAssignments.includes(a)) {
        this.filterdAssignments.push(a);
      } 
      if (teller != this.filter.length && this.filterdAssignments.includes(a)) {
        this.filterdAssignments.splice(this.filterdAssignments.indexOf(a),1);
      } 
    });
  }
}
