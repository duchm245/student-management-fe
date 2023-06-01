import { Component } from '@angular/core';
import {AuthService} from "../../security/guards/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['login'], { replaceUrl: true });
  }

}
