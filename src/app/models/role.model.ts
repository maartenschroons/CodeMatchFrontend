import { Observable } from 'rxjs';
import { RolePermission } from './role-permission.model';

export class Role {
    roleID: number;
    name: string;
    rolePermission: Observable<RolePermission>;

    constructor(roleID: number, name: string, rolePermission: Observable<RolePermission>)
    {
        this.name = name;
        this.roleID = roleID;
        this.rolePermission = rolePermission;
    }
}
