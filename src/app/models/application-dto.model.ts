import { Assignment } from './assignment.model';

export class ApplicationDto {
    makerID: Number;
    assignment: Assignment;
    isAccepted: boolean;
    applicationID: number;
    
    constructor(makerID: Number, assignment: Assignment, isAccepted: boolean){
        this.assignment = assignment;
        this.isAccepted = isAccepted;
        this.makerID = makerID;
    }
}
