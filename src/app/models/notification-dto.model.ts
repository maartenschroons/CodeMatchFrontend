import { User } from './user.model';

export class NotificationDto {
    sender: User;
    receiver: User;
    assignmentID: number;
    reviewID: number;
    applicationID: number;
    
    constructor(sender: User, receiver: User, assignmentID: number,reviewID: number,applicationID: number){
        this.sender = sender;
        this.receiver = receiver;
        this.assignmentID = assignmentID;
        this.reviewID = reviewID;
        this.applicationID = applicationID;
    }
}
