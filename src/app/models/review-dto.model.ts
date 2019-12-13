export class ReviewDto {
    senderID: number;
    receiverID: number;
    assignmentID: number;

    constructor(senderID: number, receiverID: number, assignmentID: number) {
        this.assignmentID = assignmentID;
        this.receiverID = receiverID;
        this.senderID = senderID;
    }
}
