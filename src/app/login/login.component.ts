import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

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
  
  constructor(private fb: FormBuilder, private _authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authenticateService.authenticate(this.login).subscribe(result => {
      console.log(result);

      localStorage.setItem("token", result.token);
      //Dit is hoe je data uit de token haalt
      var decoded = jwt_decode(localStorage.getItem("token"));
      var userID = decoded["UserID"];
      console.log(decoded);
      this.router.navigateByUrl('/');
      
    });
    
  }
}
