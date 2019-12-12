import { User } from './user.model';
import { Assignment } from './assignment.model';
import { Review } from './review.model';
import { Application } from './application.model';

export class Notification {
    notificationID: number;
    sender: User;
    receiver: User;
    assignmentID: number;
    assignment: Assignment;
    reviewID: number;
    review: Review;
    applicationID: number;
    application: Application;
    read: boolean;

    constructor(notificationID: number, sender: User, receiver: User, assignmentID: number, assignment: Assignment, reviewID: number, review: Review, applicationID: number, application: Application, read: boolean) {
        this.notificationID = notificationID;
        this.sender = sender;
        this.receiver = receiver;
        this.assignmentID = assignmentID;
        this.assignment = assignment;
        this.reviewID = reviewID;
        this.review = review;
        this.applicationID = applicationID;
        this.application = application;
        this.read = read;
    }
}
