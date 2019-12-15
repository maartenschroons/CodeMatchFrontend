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
import { MakerTag } from '../models/maker-tag.model';
import { CompanyTag } from '../models/company-tag.model';
import { MakerTagDTO } from '../models/maker-tag-dto.model';
import { CompanyTagDTO } from '../models/company-tag-dto.model';
import { ReviewDto } from '../models/review-dto.model';
import { AssignmentTag } from '../models/assignment-tag.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  gekozenAssignment = new BehaviorSubject(new Assignment(0, "", "", "", "", "", null, null, null, null));
  gekozenUser = new BehaviorSubject(new User(0, "", "", "", "", null, 0, null, 0, null, null, null));
  receiverID = new BehaviorSubject({ receiverid: 0, name: "", type: "", description: "" });

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

  private userSubject = new BehaviorSubject(new User(null, '', '', '', '', null, null, null, null, null, null, null));
  user = this.userSubject.asObservable();
  setUser(user: User) {
    this.userSubject.next(user);
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
    return this.http.get<Assignment[]>("https://localhost:5001/api/assignments/assignmentInitial");
  }

  addAssignment(assignment: Assignment) {
    return this.http.post<Assignment>("https://localhost:5001/api/assignments/", assignment);
  }

  getAssignment(id: number) {
    return this.http.get<Assignment>("https://localhost:5001/api/assignments/" + id);
  }

  //Tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>("https://localhost:5001/api/tags");
  }

  getAllTagsByMakerId(id: number): Observable<MakerTag[]> {
    return this.http.get<MakerTag[]>("https://localhost:5001/api/MakerTags/Maker/" + id);
  }

  getAllTagsByCompanyId(id: number): Observable<CompanyTag[]> {
    return this.http.get<CompanyTag[]>("https://localhost:5001/api/CompanyTags/Company/" + id);
  }

  getAllTagsWithoutByMakerId(id: number): Observable<Tag[]> {
    return this.http.get<Tag[]>("https://localhost:5001/api/Tags/Maker/Without/" + id);
  }

  getAllTagsWithoutByCompanyId(id: number): Observable<Tag[]> {
    return this.http.get<Tag[]>("https://localhost:5001/api/Tags/Company/Without/" + id);
  }

  addMakerTag(makerTag: MakerTagDTO) {
    return this.http.post<MakerTagDTO>("https://localhost:5001/api/MakerTags", makerTag);
  }

  addCompanyTag(companyTag: CompanyTagDTO) {
    return this.http.post<CompanyTagDTO>("https://localhost:5001/api/CompanyTags", companyTag);
  }

  deleteMakerTag(makerId: number, tagId: number) {
    return this.http.delete<MakerTag>("https://localhost:5001/api/MakerTags/" + makerId + "/" + tagId);
  }

  deleteCompanyTag(companyId: number, tagId: number) {
    return this.http.delete<CompanyTag>("https://localhost:5001/api/CompanyTags/" + companyId + "/" + tagId);
  }

  //Role
  getCompanyRole() {
    return this.http.get<Role>("https://localhost:5001/api/Roles/getCompany");
  }

  getMakerRole() {
    return this.http.get<Role>("https://localhost:5001/api/Roles/getMaker");
  }

  //Application
  postNewApplication(applicationDto: ApplicationDto) {
    return this.http.post<ApplicationDto>("https://localhost:5001/api/applications/", applicationDto);
  }

  editApplication(application: Application) {
    return this.http.put<Application>("https://localhost:5001/api/applications/" + application.applicationID, application);
  }

  //admin
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:5001/api/Users");
  }

  getAllReviewsBySender(id: number): Observable<Review[]> {
    return this.http.get<Review[]>("https://localhost:5001/api/Reviews/sender/" + id);
  }

  getAllReviewsByReceiver(id: number): Observable<Review[]> {
    return this.http.get<Review[]>("https://localhost:5001/api/Reviews/receiver/" + id);
  }
  getAllAssignmentsAdmin(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>("https://localhost:5001/api/assignments");
  }

  getAssignmentByID(id: number): Observable<Assignment> {
    return this.http.get<Assignment>("https://localhost:5001/api/assignments/" + id);
  }

  deleteUser(id: number) {
    return this.http.delete<User>("https://localhost:5001/api/Users/" + id);
  }

  deleteReview(id: number) {
    return this.http.delete<Review>("https://localhost:5001/api/Reviews/" + id);
  }

  deleteAssignment(id: number) {
    return this.http.delete<Assignment>("https://localhost:5001/api/Assignments/" + id);
  }

  deleteMaker(id: number) {
    return this.http.delete<Assignment>("https://localhost:5001/api/Assignments/" + id);
  }

  //Reviews
  GetReviewBySenderIdReceiverIdAssignmentId(reviewDto: ReviewDto): Observable<Review> {
    return this.http.get<Review>("https://localhost:5001/api/Reviews/review/" + reviewDto);
  }

  addReview(reviewDto: ReviewDto) {
    return this.http.post<ReviewDto>("https://localhost:5001/api/Reviews/", reviewDto);
  }

  //User
  getUserById(id: number) {
    return this.http.get<User>("https://localhost:5001/api/users/" + id);
  }

  //AssignmentTag
  addAssignmentTag(assignmentTag: AssignmentTag) {
    return this.http.post<AssignmentTag>("https://localhost:5001/api/applications/", assignmentTag);
  }

  addAssignmentTags(assignmentID: number, tagList: Tag[]) {
    console.log(assignmentID);
    return this.http.post<AssignmentTag>("https://localhost:5001/api/assignmentTags/addAssignmentTags?assignmentID=" + assignmentID, tagList);
  }
}