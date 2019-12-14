import { Observable } from 'rxjs';
import { Application } from './application.model';
import { MakerTag } from './maker-tag.model';
import { User } from './user.model';

export class Maker {
    makerID: number;
    firstname: string;
    lastname: string;
    nickname: string;
    dob: Date;
    linkedIn: string;
    experience: string;
    user: User;
    applications: Observable<Application>;
    makerTags: Observable<MakerTag>;

    constructor(makerID: number, firstname: string, lastname: string, nickname: string, dob: Date, linkedIn: string, experience: string, applications: Observable<Application>, makerTags: Observable<MakerTag>) 
    {
        this.makerID = makerID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.dob = dob;
        this.linkedIn = linkedIn;
        this.experience = experience;
        this.applications = applications;
        this.makerTags = makerTags;
    }
}
