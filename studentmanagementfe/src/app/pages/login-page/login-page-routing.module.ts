import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FooterOnlyLayoutComponent} from "../../layout/footer-only-layout/footer-only-layout.component";
import {LoginPageComponent} from "./login-page.component";


const routes: Routes = [
  {
    path: '',
    component: FooterOnlyLayoutComponent,
    children: [
      {path: '', component: LoginPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {
}
