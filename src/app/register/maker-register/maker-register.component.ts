import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Maker } from 'src/app/models/maker.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-maker-register',
  templateUrl: './maker-register.component.html',
  styleUrls: ['./maker-register.component.scss']
})
export class MakerRegisterComponent implements OnInit {
  modelMaker: Maker = new Maker(0, "", "", "", null, "", "", null, null);

  modelUser: User = new User(0, "", "", "", "", null, null, null, null, null, null, null)

  registerFormMaker = this.fb.group({
    username: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email] }],
    first: ['', Validators.required],
    last: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    phonenumber: ['', Validators.required],
    biography: ['', Validators.required],
    date: ['', Validators.required],
    linkedin: ['', Validators.required],
    experience: ['', Validators.required]
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
        this.appService.addMaker(this.modelMaker).subscribe(result1 => {
          this.modelUser.maker = result1;
          this.modelUser.makerID = result1.makerID;
          
          this.appService.getMakerRole().subscribe(result2 => {
            this.modelUser.role = result2;

            this.appService.addUser(this.modelUser).subscribe(result3 => {
              
              if (localStorage.getItem("token")) {
                this.router.navigate(["/profile"]);
              } else {
                this.router.navigateByUrl("/login");
              }

            });
          });
          
        })
      }
    });
  }
}

