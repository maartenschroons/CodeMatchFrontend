export class ReviewDto {
    senderID: number;
    receiverID: number;
    assignmentID: number;
    description: String;
    reviewID: number;

    constructor(senderID: number, receiverID: number, assignmentID: number,description: String) {
        this.assignmentID = assignmentID;
        this.receiverID = receiverID;
        this.senderID = senderID;
        this.description = description;
    }
}
