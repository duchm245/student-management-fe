import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "../../layout/main-layout/main-layout.component";
import {ClazzPageComponent} from "./clazz-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: ClazzPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClazzPageRoutingModule {
}
