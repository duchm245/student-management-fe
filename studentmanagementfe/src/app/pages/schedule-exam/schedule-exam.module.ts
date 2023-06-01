import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {ScheduleExamComponent} from "./schedule-exam.component";
import {ScheduleExamRoutingModule} from "./schedule-exam-routing.module";


@NgModule({
  declarations: [
    ScheduleExamComponent,

  ],
  imports: [
    CommonModule,
    ScheduleExamRoutingModule,
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
export class ScheduleExamModule {
}
