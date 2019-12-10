import { Company } from './company.model';
import { Observable } from 'rxjs';
import { Application } from './application.model';
import { Review } from './review.model';
import { AssignmentTag } from './assignment-tag.model';

export class Assignment {
    assignmentID: number;
    name: string;
    description: string;
    streetAdress: string;
    postalCode: string;
    status: string;
    company: Company;
    applications: Observable<Application>;
    reviews: Observable<Review>;
    assignmentTags: Observable<AssignmentTag>;

    constructor(assignmentID: number, name: string, description: string, streetAdress: string, postalCode: string, status: string, company: Company, applications: Observable<Application>, reviews: Observable<Review>, assignmentTags: Observable<AssignmentTag>)
    {
        this.assignmentID = assignmentID;
        this.name = name;
        this.description = description;
        this.streetAdress = streetAdress;
        this.postalCode = postalCode;
        this.status = status;
        this.company = company;
        this.applications = applications;
        this.reviews = reviews;
        this.assignmentTags = assignmentTags;
    }
}
