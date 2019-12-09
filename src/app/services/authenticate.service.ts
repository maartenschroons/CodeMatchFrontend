import { Injectable } from '@angular/core';

import { UserLogin } from '../models/user-login.model';
import { Observable } from 'rxjs';
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
}
