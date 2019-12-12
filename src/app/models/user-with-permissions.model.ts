export class UserWithPermissions {
    email: string;
    permission: string[];

    constructor(email:string, permission: string[]) {
        this.email = email;
        this.permission=  permission;
    }
}
