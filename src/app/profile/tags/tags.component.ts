import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { User } from 'src/app/models/user.model';
import { removeSummaryDuplicates } from '@angular/compiler';
import * as jwt_decode from 'jwt-decode';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  user: User = new User(null, '', '', '', '', null, null, null, null, null, null, null);
  myTags: Tag[] = [];
  allTags: Tag[] = [];
  allTagsWithoutMine: Tag[] = [];

  constructor(private _appService: AppService) { }

  ngOnInit() {
    let decodedToken = jwt_decode(localStorage.getItem('token'));
    let userId = decodedToken['UserID'];

    this._appService.getUserByIdAndRol(userId).subscribe(result => {
      this.user = result;

      this._appService.getAllTags().subscribe(result => {
        this.allTags = result;
      });
      
      if(this.user.makerID) {
        this.fillUpTagsMaker(this.user.makerID);
      }

      if(this.user.companyID) {
        this.fillUpTagsCompany(this.user.companyID);
      }
      
    });
  }

  fillUpTagsMaker(id) {
    this._appService.getAllTagsByMakerId(id).subscribe(result => {
      result.forEach(x => {
        this.myTags.push(x.tag)
      });
    });

    this._appService.getAllTagsWithoutByMakerId(id).subscribe(result => {
      this.allTagsWithoutMine = result;
    })
  }

  fillUpTagsCompany(id) {
    this._appService.getAllTagsByCompanyId(id).subscribe(result => {
      result.forEach(x => {
        this.myTags.push(x.tag)
      });
    });

    this._appService.getAllTagsWithoutByCompanyId(id).subscribe(result => {
      this.allTagsWithoutMine = result;
    })
  }

  removeTag(id) {
    if (this.user.makerID) {

    }

    if (this.user.companyID) {

    }
  }

  addTag(id) {
    if (this.user.makerID) {

    }

    if (this.user.companyID) {
      
    }
  }

}
