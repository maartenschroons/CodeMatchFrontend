export class CompanyTagDTO {
    companyTagID: number;
    companyID: number;
    tagID: number;
    
    constructor(companyTagID: number, companyID: number, tagID: number) {
        this.companyTagID = companyTagID;
        this.companyID = companyID;
        this.tagID = tagID;
    }
}