import { Role } from './role.model';
import { Maker } from './maker.model';
import { Company } from './company.model';
import { Observable } from 'rxjs';
import { Review } from './review.model';

export class User {
    userID: number;
    email: string;
    password: string;
    phonenumber: string;
    biography: string;
    role: Role;
    makerID: number;
    maker: Maker;
    companyID: number;
    company: Company;
    receivedReviews: Observable<Review>;
    sendReviews: Observable<Review>;

    constructor(userID: number, email: string, password: string, phonenumber: string, biography: string, role: Role, makerID: number, maker: Maker, companyID: number, company: Company, receivedReviews: Observable<Review>, sendReviews: Observable<Review>)
    {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.phonenumber = phonenumber;
        this.biography = biography;
        this.role = role;
        this.makerID = makerID
        this.maker = maker;
        this.companyID = companyID;
        this.company = company;
        this.receivedReviews = receivedReviews;
        this.sendReviews = sendReviews;
    }
}
