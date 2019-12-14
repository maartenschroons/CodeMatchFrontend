import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Maker } from 'src/app/models/maker.model';
import { Company } from 'src/app/models/company.model';
import { User } from '../models/user.model';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  makerCheck: boolean = true;

 constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit() {
  }

  change(){
    this.makerCheck = !this.makerCheck;
  }

  

}