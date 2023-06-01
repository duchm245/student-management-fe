import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LookupFeeComponent} from './pages/lookup-fee/lookup-fee.component';
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  ErrorStateMatcher,
  MatNativeDateModule,
  MatOptionModule,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from "@angular/material/menu";
import {Interceptor} from "./Interceptor";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {LayoutModule} from "./layout/layout.module";
import {LoginPageModule} from "./pages/login-page/login-page.module";
import { MarkPageComponent } from './pages/mark-page/mark-page.component';
import {MarkPageModule} from "./pages/mark-page/mark-page.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LookupFeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    FlexModule,
    LayoutModule,
    LoginPageModule,
    // StudentModule,
    // StudentAddModule,
    // HomeModule,
    MarkPageModule


  ],
  providers: [DatePipe, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    // { provide: LOCALE_ID, useValue: "en-GB" },
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  exports: [
    // NotifyComponent,
    // HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } :
// useValue được sử dụng để chỉ định ngôn ngữ ngày tháng cho ứng dụng
// ngôn ngữ được sử dụng ở đây là "en-GB", tức là tiếng Anh của Vương quốc Anh,
// với định dạng ngày tháng là dd/MM/yyyy
