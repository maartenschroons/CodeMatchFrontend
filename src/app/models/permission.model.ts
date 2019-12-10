export class Permission {
    permissionID: number;
    name: string;

    constructor(permissionID: number, name: string)
    {
        this.name = name;
        this.permissionID = permissionID;
    }
}
