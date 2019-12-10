import { Injectable } from '@angular/core';

import { UserLogin } from '../models/user-login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private _httpClient: HttpClient) { }

  //Log in the user
  authenticate(userLogin: UserLogin): any {
    return this._httpClient.post<UserLogin>("https://localhost:5001/api/Users/authenticate", userLogin); 
  }



  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedOut() {
    localStorage.setItem("token", "");
  }

  // sets true when someone is logged in
  private loggedIn = new BehaviorSubject(false);
  login = this.loggedIn.asObservable();
  updateLoginStatus(status: boolean) {
    this.loggedIn.next(status);
  }

}
