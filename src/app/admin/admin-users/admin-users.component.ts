import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: Observable<User[]>;
  userFilter: Observable<User[]>;

  constructor(private _appService: AppService, private router: Router) {
    this.instantiateLists();
    this.users.subscribe(e => {console.log(e)});
  }

  instantiateLists() {
    this.users = this._appService.getAllUsers();
    this.userFilter = this._appService.getAllUsers();
  }

  ngOnInit() {
  }

  search(email: string) {

    this.userFilter.pipe(map(user =>
      user.filter(user =>
        user.email.toLowerCase().includes(email)
      ))).subscribe(result => {
        this.users = of(result);
      })
  }

  showReview(user: User) {
    this._appService.gekozenUser.next(user);
    this.router.navigate(["userReviewList"]);
  }

  delete(userID: number) {
    this._appService.deleteUser(userID).subscribe(result => {
      this.instantiateLists();
    });
  }

  editUser(userID: number) {
    this._appService.setUserIdForEdit(userID);
    this.router.navigate(['editUser']);
  }

}
