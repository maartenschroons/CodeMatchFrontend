import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserWithPermissions } from 'src/app/models/user-with-permissions.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { UserDTO } from 'src/app/models/user-dto.model';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 
  

}
