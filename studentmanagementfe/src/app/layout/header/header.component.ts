import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../security/guards/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    console.log("test123432");
    this.toggleSidebarForMe.emit();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
