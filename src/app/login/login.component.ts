import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AppService } from '../services/app.service';
import { UserWithPermissions } from '../models/user-with-permissions.model';
import { ProfileEditComponent } from '../profile/profile-edit/profile-edit.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: UserLogin = new UserLogin("", "");
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  userWithPermissions: UserWithPermissions = new UserWithPermissions('', []);

  constructor(private fb: FormBuilder, private _authenticateService: AuthenticateService, private router: Router, private _appService: AppService) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authenticateService.authenticate(this.login).subscribe(result => {
      
      this._authenticateService.isLoggedin.next(result.token ? true : false);
     
      localStorage.setItem("token", result.token);
      
      this.router.navigateByUrl('/profile');

      let decodedToken = jwt_decode(localStorage.getItem('token'));
      let userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(userId).subscribe(result => {
      this._appService.setUser(result);

      if (result.roleID == 3) {
        this._appService.setIsAdmin(true);
      } else {
        this._appService.setIsAdmin(false);
      }
      
      this.userWithPermissions.email = result.email;
      result.role.rolePermissions.forEach(x => {
        this.userWithPermissions.permission.push(x.permission.name);
      });
      this._appService.setUserPermissions(this.userWithPermissions);
    })
    });
  }
}
