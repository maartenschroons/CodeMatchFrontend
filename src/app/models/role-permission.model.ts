import { Role } from './role.model';
import { Permission } from './permission.model';

export class RolePermission {
    rolePermissionID: number;
    role: Role;
    permission: Permission;

    constructor(rolePermissionID: number, role: Role, permission: Permission)
    {
        this.rolePermissionID = rolePermissionID;
        this.role = role;
        this.permission = permission;
    }
}
