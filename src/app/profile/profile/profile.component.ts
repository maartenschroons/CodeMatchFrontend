import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { User } from 'src/app/models/user.model';
import * as jwt_decode from 'jwt-decode';
import { UserWithPermissions } from 'src/app/models/user-with-permissions.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null , null, null, null, null, null, null);
  userId: number;
  isLoaded: boolean = false;
  userWithPermissions: UserWithPermissions = new UserWithPermissions('', []);

  constructor(private _appService: AppService) { }

  ngOnInit() {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;
      this.isLoaded = true;

      this.userWithPermissions.email = result.email;
      result.role.rolePermissions.forEach(x => {
        this.userWithPermissions.permission.push(x.permission.name);
      });
      this._appService.setUserPermissions(this.userWithPermissions);
    })

    
  }

}
