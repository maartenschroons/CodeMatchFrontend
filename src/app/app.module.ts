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
<<<<<<< HEAD
import { OverviewComponent } from './profile/overview/overview.component'
import { SearchAssignmentComponent } from './assignment/search-assignment/search-assignment.component';
import { AssignmentModule } from './assignment/assignment.module';
import { ProfileModule } from './profile/profile.module';
=======
import { OverviewComponent } from './profile/overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentModule } from './assignment/assignment.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security.interceptor';

>>>>>>> efc2056712bc5f1b2561c818d340098cc9aa43bb

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'profile', component: OverviewComponent },
  { path: 'searchAssignment', component: SearchAssignmentComponent}
=======
  { path: 'profile', component: OverviewComponent }
>>>>>>> efc2056712bc5f1b2561c818d340098cc9aa43bb
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
<<<<<<< HEAD
    ProfileModule,
=======
    HttpClientModule,
    AssignmentModule,
>>>>>>> efc2056712bc5f1b2561c818d340098cc9aa43bb
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
