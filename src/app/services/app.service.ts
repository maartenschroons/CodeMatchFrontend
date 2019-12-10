import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maker } from '../models/maker.model';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { Assignment } from '../models/assignment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUserByIdAndRol(id: number) {
    return this.http.get<User>("https://localhost:5001/api/Users/user/info/" + id)
  }

  //register
  checkMail(mail: string) {
    return this.http.get<boolean>("https://localhost:5001/api/users/checkMail?mail=" + mail)
  }

  addMaker(maker: Maker) {
    return this.http.post<Maker>("https://localhost:5001/api/makers", maker);
  }

  addCompany(company: Company) {
    return this.http.post<Company>("https://localhost:5001/api/companies", company);
  }

  addUser(user: User) {
    return this.http.post<User>("https://localhost:5001/api/users", user);
  }

  //dashboard

  getUser(userID: number): any {
    return this.http.get<User>("https://localhost:5001/api/Users/" + userID);
  }

  getAllInitialAssignmentsByCompany(companyId: number): Observable<Assignment[]>{
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/initial/company/"+companyId);
  }

  getAllInProgressAssignmentsByCompany(companyId: number): Observable<Assignment[]>{
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/inProgress/company/"+companyId);
  }
  //Assignments
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/assignments");
  }
}