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
=======
import { SearchAssignmentComponent } from './assignment/search-assignment/search-assignment.component';
import { AssignmentModule } from './assignment/assignment.module';
>>>>>>> c9f7998b3e9a4c273e6af52c862c27ac8333b07d

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'profile', component: OverviewComponent }
=======
  { path: 'searchAssignment', component: SearchAssignmentComponent}
>>>>>>> c9f7998b3e9a4c273e6af52c862c27ac8333b07d
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AssignmentModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
