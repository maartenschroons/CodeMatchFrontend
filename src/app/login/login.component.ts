import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from '../models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: UserLogin = new UserLogin("", "");
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
