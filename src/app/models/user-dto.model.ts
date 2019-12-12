export class UserDTO {
    userID: number;
    email: string;
    phonenumber: string;
    biography: string;
    roleID: number;
    makerID: number;
    companyID: number;

    constructor(userID: number, email: string, phonenumber: string, biography: string, roleID: number, makerID: number, companyID: number) {
        this.userID = userID;
        this.email = email;
        this.phonenumber = phonenumber;
        this.biography = biography;
        this.roleID = roleID;
        this.makerID = makerID;
        this.companyID = companyID;
    }
}