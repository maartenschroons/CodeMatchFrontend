import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null , null, null, null, null, null, null);
  userId: number;
  editUserForm: FormGroup;
  
  constructor(private  _appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {

    this.editUserForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      linkedin: ['', Validators.required],
      experience: [''],
      biography: ['']
    })

    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;

      this.editUserForm.patchValue({
         nickname: this.user.maker.nickname,
         email: this.user.email,
         firstname: this.user.maker.firstname,
         lastname: this.user.maker.lastname,
         phonenumber: this.user.phonenumber,
         linkedin: this.user.maker.linkedIn,
         experience: this.user.maker.experience,
         biography: this.user.biography
      })
    })
  }

  

  onSubmit() {

  }

}
