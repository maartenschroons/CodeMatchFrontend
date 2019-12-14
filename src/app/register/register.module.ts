import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AppService } from '../services/app.service';
import { MakerRegisterComponent } from './maker-register/maker-register.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';



@NgModule({
  declarations: [RegisterComponent, MakerRegisterComponent, CompanyRegisterComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AppService
  ]
})
export class RegisterModule { }
