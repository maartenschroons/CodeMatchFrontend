import { AssignmentTag } from './assignment-tag.model';
import { Observable } from 'rxjs';
import { CompanyTag } from './company-tag.model';
import { MakerTag } from './maker-tag.model';

export class Tag {
    tagID: number;
    name: string;
    assignmentTag: Observable<AssignmentTag>;
    companyTag: Observable<CompanyTag>;
    makerTag: Observable<MakerTag>;

    constructor(tagID: number, name: string, assignmentTag: Observable<AssignmentTag>, companyTag: Observable<CompanyTag>, makerTag: Observable<MakerTag>)
    {
        this.assignmentTag = assignmentTag;
        this.companyTag = companyTag;
        this.makerTag = makerTag;
        this.name = name;
        this.tagID = tagID;
    }
}
