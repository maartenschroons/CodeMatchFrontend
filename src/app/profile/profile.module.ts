import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    OverviewComponent,
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class ProfileModule { }
