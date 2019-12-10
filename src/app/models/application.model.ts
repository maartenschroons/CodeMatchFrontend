import { Assignment } from './assignment.model';
import { Maker } from './maker.model';

export class Application {
    applicationID: number;
    maker: Maker;
    assignment: Assignment;
    isAccepted: boolean;
    
    constructor(applicationID: number, maker: Maker, assignment: Assignment, isAccepted: boolean){
        this.applicationID = applicationID;
        this.assignment = assignment;
        this.isAccepted = isAccepted;
        this.maker = maker;
    }
}
