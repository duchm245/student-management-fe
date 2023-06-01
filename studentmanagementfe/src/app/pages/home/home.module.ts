import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {NotifyComponent} from "./notify/notify.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    NotifyComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {
}
