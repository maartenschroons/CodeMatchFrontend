import { User } from './user.model';

export class NotificationDto {
    senderID: number;
    receiverID: number;
    assignmentID: number;
    reviewID: number;
    applicationID: number;
    
    constructor(sender: number, receiver: number, assignmentID: number,reviewID: number,applicationID: number){
        this.senderID = sender;
        this.receiverID = receiver;
        this.assignmentID = assignmentID;
        this.reviewID = reviewID;
        this.applicationID = applicationID;
    }
}
