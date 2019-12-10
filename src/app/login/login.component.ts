import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';

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
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userID+"")
      this.router.navigateByUrl('/dashboard');      
    });
  }
}
