import { Assignment } from './assignment.model';
import { Tag } from './tag.model';

export class AssignmentTag {
    assignmentTagID: number;
    assignment: Assignment;
    tag: Tag;

    constructor(assignmentTagID: number, assignment: Assignment, tag: Tag)
    {
        this.assignmentTagID = assignmentTagID;
        this.assignment = assignment;
        this.tag = tag;
    }
}
