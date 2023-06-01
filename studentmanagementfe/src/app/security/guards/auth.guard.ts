import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router, private _snackBar: MatSnackBar) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('canActive: ', route, state);
    // // if (state.url.includes('clazz')) {
    // //   console.error('Link cấm :>');
    // //   return false;
    // // }
    //
    // if (this.authService.isLoggedIn == true) {
    //
    //   console.log("Okk cho qua");
    //   return true;
    // } else {
    //   // this.authService.login(state.url);
    //   console.log("Login đi!");
    //   this.showSnackBarLogin();
    //   return false;
    // }
    if (this.authService.isLogged()) {
      this.authService.redirectUrl = null;
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['login']);
    return false;
  }

  // showSnackBarLogin() {
  //   const config = new MatSnackBarConfig();
  //   config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
  //   config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
  //   config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
  //   this._snackBar.open("Login đi!", "X", config);
  // }

}
