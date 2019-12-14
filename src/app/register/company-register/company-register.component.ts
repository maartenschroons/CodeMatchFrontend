import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  modelCompany: Company = new Company(0, "", "", null, null, null);
  modelUser: User = new User(0, "", "", "", "", null, null, null, null, null, null, null)

  registerFormCompany = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    phonenumber: ['', Validators.required],
    biography: ['', Validators.required],
    streetAdress: ['', Validators.required],
    postalCode: ['', Validators.required]
  }, { validator: this.matchingPasswords('password', 'cpassword') });

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

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

  ngOnInit() {
  }

  onSubmit() {
    this.appService.checkMail(this.modelUser.email).subscribe(result => {
      if (!result) {
        this.appService.addCompany(this.modelCompany).subscribe(result => {
          this.modelUser.company = result;
          this.modelUser.companyID = result.companyID;
          
          this.appService.getCompanyRole().subscribe(result2 => {
            this.modelUser.role = result2;
            console.log(this.modelUser);
          });

          this.appService.addUser(this.modelUser).subscribe(result => {
            this.router.navigateByUrl("/login");
          });
        })
      }
    });
  }

}
