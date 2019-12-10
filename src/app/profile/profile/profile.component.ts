import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { User } from 'src/app/models/user.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null , null, null, null, null, null, null);
  userId: number;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    this.userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(this.userId).subscribe(result => {
      this.user = result;
    })

    
  }

}
