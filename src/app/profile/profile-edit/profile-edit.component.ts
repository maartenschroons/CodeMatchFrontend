import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import * as jwt_decode from 'jwt-decode';
import { UserWithPermissions } from 'src/app/models/user-with-permissions.model';
import { UserDTO } from 'src/app/models/user-dto.model';
import { CompanyDTO } from 'src/app/models/company-dto.model';
import { MakerDTO } from 'src/app/models/maker-dto.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null, null, null, null, null, null, null);
  userId: number;
  editUserForm: FormGroup;
  userWithPermissions: UserWithPermissions = new UserWithPermissions('', []);

  constructor(private _appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {

    this.editUserForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      linkedin: ['', Validators.required],
      companyname: ['', Validators.required],
      streetaddress: ['', Validators.required],
      postalcode: ['', Validators.required],
      experience: [''],
      biography: ['']
    })

    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;
      
      if(this.user.companyID) {
        this.fillCompanyFormInfo();
      }

      if(this.user.makerID) {
        this.fillMakerFormInfo();
      }
      
      this.userWithPermissions.email = result.email;
      result.role.rolePermissions.forEach(x => {
        this.userWithPermissions.permission.push(x.permission.name);
      });
      this._appService.setUserPermissions(this.userWithPermissions);
    })
  }

  fillMakerFormInfo() {
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
  }

  fillCompanyFormInfo() {
    this.editUserForm.patchValue({
      companyname: this.user.company.name,
      email: this.user.email,
      biography: this.user.biography,
      streetaddress: this.user.company.streetAdress,
      postalcode: this.user.company.postalCode, 
      phonenumber: this.user.phonenumber
    })
  }

  onSubmit() {
    let user = new UserDTO(this.user.userID, this.editUserForm.get('email').value, this.editUserForm.get('phonenumber').value, this.editUserForm.get('biography').value,
              this.user.role.roleID, this.user.makerID, this.user.companyID);

    this._appService.updateUser(user.userID, user).subscribe();

    if(this.user.companyID) {
      let company = new CompanyDTO(this.user.companyID, this.editUserForm.get('companyname').value, this.editUserForm.get('streetaddress').value, this.editUserForm.get('postalcode').value)
      this._appService.updateCompany(company.companyID, company).subscribe(result => {
        this._appService.setUpdateProfileAfterSave(true);
      });
    }

    if(this.user.makerID) {
      let maker = new MakerDTO(this.user.makerID, this.editUserForm.get('firstname').value, this.editUserForm.get('lastname').value, this.editUserForm.get('nickname').value,
                  this.editUserForm.get('linkedin').value, this.editUserForm.get('experience').value, this.user.maker.dob)
      this._appService.updateMaker(maker.makerID, maker).subscribe(result => {
        this._appService.setUpdateProfileAfterSave(true);
      });
    }
  }
}
