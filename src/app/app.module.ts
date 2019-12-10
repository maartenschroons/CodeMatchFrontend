import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { SearchAssignmentComponent } from './assignment/search-assignment/search-assignment.component';
import { ProfileModule } from './profile/profile.module';
import { OverviewComponent } from './profile/overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security.interceptor';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: OverviewComponent },
  { path: 'searchAssignment', component: SearchAssignmentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AssignmentModule,
    ProfileModule,
    HttpClientModule,
    AssignmentModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
