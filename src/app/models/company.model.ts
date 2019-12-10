import { Assignment } from './assignment.model';
import { Observable } from 'rxjs';
import { CompanyTag } from './company-tag.model';

export class Company {
    companyID: number;
    streetAdress: string;
    postalCode: number;
    assignments: Observable<Assignment>;
    companyTags: Observable<CompanyTag>;

    constructor(companyID: number, streetAdress: string, postalCode: number, assignments: Observable<Assignment>, companyTags: Observable<CompanyTag>)
    {
        this.companyID = companyID;
        this.streetAdress = streetAdress;
        this.postalCode = postalCode;
        this.assignments = assignments;
        this.companyTags = companyTags;     
    }
}
