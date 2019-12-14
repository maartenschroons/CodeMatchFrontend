import { Company } from './company.model';
import { Tag } from './tag.model';

export class CompanyTag {
    companyTagID: number;
    companyID: number;
    tagID: number;
    company: Company;
    tag: Tag;

    constructor(companyTagID: number, company: Company, tag: Tag, companyID: number, tagID: number)
    {
        this.company = company;
        this.companyTagID = companyTagID;
        this.tag = tag;
        this.companyID = companyID;
        this.tagID = tagID;
    }
}
