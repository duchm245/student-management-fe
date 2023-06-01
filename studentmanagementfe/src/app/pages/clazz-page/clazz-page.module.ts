import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ClassEditDialogComponent} from "./class-edit-dialog/class-edit-dialog.component";
import {ClazzPageComponent} from "./clazz-page.component";
import {ClazzPageRoutingModule} from "./clazz-page-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AddClazzDialogComponent} from "./clazz-add-dialog/add-clazz-dialog.component";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    ClazzPageComponent,
    ClassEditDialogComponent,
    AddClazzDialogComponent,
  ],
  imports: [
    CommonModule,
    ClazzPageRoutingModule,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class ClazzGetModule {
}
