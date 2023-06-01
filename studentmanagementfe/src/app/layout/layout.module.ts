import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {FooterOnlyLayoutComponent} from "./footer-only-layout/footer-only-layout.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {HeaderRootComponent} from "./header-root/header-root.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    MainLayoutComponent,
    FooterOnlyLayoutComponent
  ],
  declarations: [
    MainLayoutComponent,
    FooterOnlyLayoutComponent,
    FooterComponent,
    HeaderRootComponent,
    HeaderComponent,
    SidebarComponent,
  ]
})
export class LayoutModule { }
