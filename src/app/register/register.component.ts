import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Maker } from 'src/app/models/maker.model';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  makerCheck: boolean = true;
  modelMaker: Maker = new Maker(null, "", "", "", null, "", "", null, null);
  modelCompany: Company = new Company(null, "", null, null, null);

  registerFormMaker = this.fb.group({
    username: ['', Validators.required],
    email: ['', {validators: [Validators.required, Validators.email]}],
    first: ['', Validators.required],
    last: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    phonenumber: ['', Validators.required],
    date: ['', Validators.required],
    linkedin: ['', Validators.required],
    experience: ['', Validators.required]
  }, { validator: this.matchingPasswords('password', 'cpassword') });

  registerFormCompany = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    phonenumber: ['', Validators.required],
    address: ['', Validators.required]
  }, { validator: this.matchingPasswords('password', 'cpassword') });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        passwordConfirmationInput.setErrors(passwordConfirmationInput.validator(passwordConfirmationInput))
      }
    }
  }

  change(){
    this.makerCheck = !this.makerCheck;
  }

  onSubmit()
  {
    if(this.makerCheck)
    {
      console.log(this.modelMaker);
    }
  }

}
