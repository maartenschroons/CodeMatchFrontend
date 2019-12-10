import { Assignment } from './assignment.model';
import { User } from './user.model';

export class Review {
    reviewID: number;
    description: string;
    assignment: Assignment;
    userIDSender: number;
    sender: User;
    userIDReceiver: number;
    receiver: User;
    
    constructor(reviewID: number, description: string, assignment: Assignment, userIDSender: number, sender: User, userIDReceiver: number, receiver: User)
    {
        this.reviewID = reviewID;
        this.description = description;
        this.assignment = assignment;
        this.userIDSender =userIDSender;
        this.sender = sender;
        this.userIDReceiver = userIDReceiver;
        this.receiver = receiver;
    }
}
