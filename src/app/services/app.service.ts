import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maker } from '../models/maker.model';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { Assignment } from '../models/assignment.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserWithPermissions } from '../models/user-with-permissions.model';
import { Tag } from '../models/tag.model';
import { ApplicationDto } from '../models/application-dto.model';

import { UserDTO } from '../models/user-dto.model';
import { MakerDTO } from '../models/maker-dto.model';
import { CompanyDTO } from '../models/company-dto.model';
import { Notification } from '../models/notification.model';
import { Application } from '../models/application.model';
import { NotificationDto } from '../models/notification-dto.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  gekozenAssignment = new BehaviorSubject(new Assignment(0, "", "", "", "", "", null, null, null, null));
  gekozenUser = new BehaviorSubject(new User(0,"","","","",null,0,null,0,null,null,null));
  constructor(private http: HttpClient) { }

  // behaviorSubjects
  private userPermissionsSubject = new BehaviorSubject(new UserWithPermissions('', []));
  userPermissions = this.userPermissionsSubject.asObservable();
  setUserPermissions(userWithPermissions: UserWithPermissions) {
    this.userPermissionsSubject.next(userWithPermissions);
  }

  private updateProfileAfterSaveSubject = new BehaviorSubject(false);
  updateProfileAfterSave = this.updateProfileAfterSaveSubject.asObservable();
  setUpdateProfileAfterSave(update: boolean) {
    this.updateProfileAfterSaveSubject.next(update);
  }

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

  editAssignment(assignment: Assignment) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignments/" + assignment.assignmentID, assignment);
  }

  getUser(userID: number): any {
    return this.http.get<User>("https://localhost:5001/api/Users/" + userID);
  }

  getAllInitialAssignmentsByCompany(companyId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/initial/company/" + companyId);
  }

  getAllInProgressAssignmentsByCompany(companyId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/inProgress/company/" + companyId);
  }

  getAllCompletedAssignmentsByCompany(companyId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/completed/company/" + companyId);
  }

  getAllInProgressAssignmentsByMaker(makerId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/inProgress/maker/" + makerId);
  }

  getAllCompletedAssignmentsByMaker(makerId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignments/completed/maker/" + makerId);
  }

  //Notifications
  GetNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/" + userId);
  }

  GetReviewNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Review/" + userId);
  }

  GetReadReviewNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Review/read/" + userId);
  }

  GetApplicationNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Application/" + userId);
  }
  GetReadApplicationNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Application/read/" + userId);
  }

  GetReadApplicationNotificationsByCompany(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/company/Application/read/" + userId);
  }

  GetAssignmentNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Assignment/" + userId);
  }
  GetReadAssignmentNotificationsByReceiver(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/receiver/Assignment/read/" + userId);
  }

  GetApplicationNotificationsBySender(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>("https://localhost:5001/api/Notifications/sender/Application/" + userId);
  }

  PostNotification(notification: NotificationDto) {
    return this.http.post<NotificationDto>("https://localhost:5001/api/Notifications/", notification);
  }

  EditNotification(notification: Notification) {
    return this.http.put<Notification>("https://localhost:5001/api/Notifications/" + notification.notificationID, notification);
  }

  //Assignments
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/assignments");
  }

  //Tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>("https://localhost:5001/api/tags");
  }

  //Application
  postNewApplication(applicationDto: ApplicationDto) {
    return this.http.post<ApplicationDto>("https://localhost:5001/api/applications/", applicationDto);
  }

  editApplication(application: Application) {
    return this.http.put<Application>("https://localhost:5001/api/applications/" + application.applicationID, application);
  }

  //admin
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>("https://localhost:5001/api/Users");
  }

  getAllReviewsBySender(id: number):Observable<Review[]>{
    return this.http.get<Review[]>("https://localhost:5001/api/Reviews/sender/"+id);
  }

  getAllReviewsByReceiver(id: number):Observable<Review[]>{
    return this.http.get<Review[]>("https://localhost:5001/api/Reviews/receiver/"+id);
  }

}