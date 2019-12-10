import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userID: number): any{
    return this.http.get<UserLogin>("https://localhost:5001/api/User/"+ userID);
  }
}
