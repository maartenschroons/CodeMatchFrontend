import { first } from 'rxjs/operators';

export class MakerDTO {
    makerID: number;
    firstname: string;
    lastname: string;
    nickname: string;
    linkedIn: string;
    experience: string;
    dob: Date;

    constructor(makerID: number, firstname: string, lastname: string, nickname: string, linkedIn: string, experience: string, dob: Date) {
        this.makerID = makerID;
        this.firstname = firstname;
        this.lastname =  lastname;
        this.nickname = nickname;
        this.linkedIn = linkedIn;
        this.experience = experience;
        this.dob = dob;
    }
}