import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maker } from '../models/maker.model';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { Assignment } from '../models/assignment.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserWithPermissions } from '../models/user-with-permissions.model';
import { UserDTO } from '../models/user-dto.model';
import { MakerDTO } from '../models/maker-dto.model';
import { CompanyDTO } from '../models/company-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUserByIdAndRol(id: number) {
    return this.http.get<any>("https://localhost:5001/api/Users/user/info/" + id)
  }

  updateUser(id: number, user: UserDTO) {
    return this.http.put("https://localhost:5001/api/Users/" + id, user);
  }

  updateMaker(id: number, maker: MakerDTO) {
    return this.http.put("https://localhost:5001/api/Makers/" + id, maker);
  }

  updateCompany(id: number, company: CompanyDTO) {
    return this.http.put("https://localhost:5001/api/Companies/" + id, company);
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

  // behaviorSubjects
  private userPermissionsSubject = new BehaviorSubject(new UserWithPermissions('', []));
  userPermissions = this.userPermissionsSubject.asObservable();
  setUserPermissions(userWithPermissions: UserWithPermissions) {
    this.userPermissionsSubject.next(userWithPermissions);
  }
}