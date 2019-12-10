import { Company } from './company.model';
import { Tag } from './tag.model';

export class CompanyTag {
    companyTagID: number;
    company: Company;
    tag: Tag;

    constructor(companyTagID: number, company: Company, tag: Tag)
    {
        this.company = company;
        this.companyTagID = companyTagID;
        this.tag = tag;
    }
}
