import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AppService } from '../services/app.service';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AppService
  ]
})
export class RegisterModule { }
