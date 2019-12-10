import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maker } from '../models/maker.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  //register
  checkMail(mail: string) {
    return this.http.get<boolean>("https://localhost:5001/api/users/checkMail?mail=" + mail)
  }

  addMaker(maker: Maker) {
    return this.http.post<Maker>("https://localhost:5001/api/makers", maker);
  }

  addUser(user: User) {
    return this.http.post<User>("https://localhost:5001/api/users", user);
  }

  //dashboard
}