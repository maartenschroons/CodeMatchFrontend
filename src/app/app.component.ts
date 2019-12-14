import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  login: boolean;

  constructor(private _authenticateService: AuthenticateService, private breakpointObserver: BreakpointObserver, private router: Router) {
    this._authenticateService.checkLogin();
    this._authenticateService.isLoggedin.subscribe(e => {
      this.login = !e.valueOf();
      //console.log(this._authenticateService.wieIsLoggedIn);

    })
  }

  logOut() {
    localStorage.removeItem("token");
    this._authenticateService.isLoggedin.next(this.login ? true : false);
    this.router.navigate([""]);
  }

  ngOnInit() {

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
