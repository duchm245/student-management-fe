import {NgModule} from "@angular/core";
import {StudentGetComponent} from "./student-get/student-get.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {StudentRoutingModule} from "./student-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {EditStudentComponent} from "./student-edit/edit-student.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AddStudentComponent} from "./student-add/add-student.component";
import {MarkDialogComponent} from "./student-mark-dialog/mark-dialog.component";
import {SelectClazzDialog2Component} from "./student-select-clazz-dialog2/select-clazz-dialog2.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";


@NgModule({
  declarations: [
    StudentGetComponent,
    AddStudentComponent,
    EditStudentComponent,
    MarkDialogComponent,
    SelectClazzDialog2Component

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,

  ],
})
export class StudentModule {
}
