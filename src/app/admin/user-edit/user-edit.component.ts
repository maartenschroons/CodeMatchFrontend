import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserWithPermissions } from 'src/app/models/user-with-permissions.model';
import { AppService } from 'src/app/services/app.service';
import { UserDTO } from 'src/app/models/user-dto.model';
import { CompanyDTO } from 'src/app/models/company-dto.model';
import { MakerDTO } from 'src/app/models/maker-dto.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


  user: User = new User(null, '', '', '', '', null, null, null, null, null, null, null);
  userWithPermissions: UserWithPermissions = new UserWithPermissions('', []);
  editUserForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _appService: AppService, private router: Router) { }

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

    this._appService.userIdForEdit.subscribe(result => {
      if (result == 0) {
        this.router.navigate(['admin']);
      } else {
        this.getUserAndFillForms(result);
      }
    })
  }

  getUserAndFillForms(userID) {
    this._appService.getUserByIdAndRol(userID).subscribe(result => {
      this.user = result;
      //console.log(result);
      if (this.user.companyID) {
        this.fillCompanyFormInfo();
      }

      if (this.user.makerID) {
        this.fillMakerFormInfo();
      }

      this.getPermissions(result);
    })
  }

  getPermissions(user) {
    this.userWithPermissions.email = user.email;
    user.role.rolePermissions.forEach(x => {
      this.userWithPermissions.permission.push(x.permission.name);
    });
    this._appService.setUserPermissions(this.userWithPermissions);
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

    if (this.user.companyID) {
      let company = new CompanyDTO(this.user.companyID, this.editUserForm.get('companyname').value, this.editUserForm.get('streetaddress').value, this.editUserForm.get('postalcode').value)
      this._appService.updateCompany(company.companyID, company).subscribe();
    }

    if (this.user.makerID) {
      let maker = new MakerDTO(this.user.makerID, this.editUserForm.get('firstname').value, this.editUserForm.get('lastname').value, this.editUserForm.get('nickname').value,
        this.editUserForm.get('linkedin').value, this.editUserForm.get('experience').value, this.user.maker.dob)
      this._appService.updateMaker(maker.makerID, maker).subscribe();
    }
  }

}
