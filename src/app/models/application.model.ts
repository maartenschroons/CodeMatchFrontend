import { Assignment } from './assignment.model';
import { Maker } from './maker.model';

export class Application {
    applicationID: number;
    makerID: number;
    maker: Maker;
    assignmentID: number;
    assignment: Assignment;
    isAccepted: boolean;
    
    constructor(applicationID: number,makerID: number, maker: Maker, assignmentID: number, assignment: Assignment, isAccepted: boolean){
        this.applicationID = applicationID;
        this.assignmentID = assignmentID;
        this.assignment = assignment;
        this.isAccepted = isAccepted;
        this.makerID = makerID;
        this.maker = maker;
    }
}
