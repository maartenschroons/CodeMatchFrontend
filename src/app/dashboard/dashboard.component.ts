import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name: string;
notificationAmount: number= 1;
messageAmount: number= 2;
assignments: Observable<Assignment[]>;
appliedassignments: Observable<Assignment[]>;
assignmentsLength: number = 0;
appliedassignmentsLength: number =0;
makerCheck: boolean = true;

  constructor(private router: Router, private _userService: UserService) { 
    console.log(parseInt(localStorage.getItem("userId")));
    this.instantiateLists()
  }

  instantiateLists(){
    this._userService.getUser(parseInt(localStorage.getItem("userId"))).subscribe(result => {this.name = result.email});
  }

  ngOnInit() {
  }

  goToNotification(){
    this.router.navigateByUrl('/notification');
  }

  goToMessages(){
    this.router.navigateByUrl('/');
  }

}
