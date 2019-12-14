import { Assignment } from './assignment.model';
import { Observable } from 'rxjs';
import { CompanyTag } from './company-tag.model';
import { User } from './user.model';

export class Company {
    companyID: number;
    name: string;
    streetAdress: string;
    postalCode: number;
    user: User;
    assignments: Observable<Assignment>;
    companyTags: Observable<CompanyTag>;

    constructor(companyID: number, name: string, streetAdress: string, postalCode: number, assignments: Observable<Assignment>, companyTags: Observable<CompanyTag>)
    {
        this.companyID = companyID;
        this.streetAdress = streetAdress;
        this.postalCode = postalCode;
        this.assignments = assignments;
        this.companyTags = companyTags; 
        this.name = name;    
    }
}
