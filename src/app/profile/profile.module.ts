import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    OverviewComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
