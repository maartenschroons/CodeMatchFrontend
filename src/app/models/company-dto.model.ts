export class CompanyDTO {
    companyID: number;
    name: string;
    streetAdress: string;
    postalCode: number;

    constructor(companyID: number, name: string, streetAdress: string, postalCode: number) {
        this.companyID = companyID;
        this.name = name;
        this.streetAdress = streetAdress;
        this.postalCode = postalCode;
    }
}