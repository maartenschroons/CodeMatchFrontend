import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name: string = "test";
notificationAmount: number= 1;
assignments: Observable<Assignment[]>;

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  gotToNotification(){
    this.router.navigateByUrl('/notification');
  }

}
