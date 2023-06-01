import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TimeLineComponent} from "../time-line/time-line.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {CommonService} from "../../../services/common.service";
import {MyErrorStateMatcher} from "../../students-page/student-edit/edit-student.component";

@Component({
  selector: 'app-time-line-edit',
  templateUrl: './time-line-edit.component.html',
  styleUrls: ['./time-line-edit.component.scss']
})
export class TimeLineEditComponent implements OnInit {
  public days: any[] = [
    {value: 2, viewValue: "Monday"},
    {value: 3, viewValue: "Tuesday"},
    {value: 4, viewValue: "Wednesday"},
    {value: 5, viewValue: "Thursday"},
    {value: 6, viewValue: "Friday"},
    {value: 7, viewValue: "Saturday"}
  ]
  public subjects: any;
  public listTimeLineMonday: any;
  public subjectsOfDayFromApi: any;
  public matcher = new MyErrorStateMatcher();
  public newTimeLineForm = new FormGroup({
    day: new FormControl(2, [Validators.required]),
    subject1: new FormControl(1, [Validators.required]),
    subject2: new FormControl(1, [Validators.required]),
    subject3: new FormControl(1),
    subject4: new FormControl(1),
    subject5: new FormControl(1)
  })
  public timeLineCurrentForm: any;

  constructor(private commonService: CommonService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<TimeLineComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { clazzId: any }) {
  }

  ngOnInit(): void {
    this.commonService.getAllSubject().subscribe(data => {
      this.subjectsOfDayFromApi = data.data;
    });

    this.commonService.getTimeLineMonday(this.data.clazzId).subscribe(data => {
      this.listTimeLineMonday = data.data;
      console.log("list time line monday: " + JSON.stringify(this.listTimeLineMonday));
      console.log("lesson 1 : " + this.listTimeLineMonday.lesson1);

      this.newTimeLineForm.setValue({
        day: 2,
        subject1: this.listTimeLineMonday.lesson1,
        subject2: this.listTimeLineMonday.lesson2,
        subject3: this.listTimeLineMonday.lesson3,
        subject4: this.listTimeLineMonday.lesson4,
        subject5: this.listTimeLineMonday.lesson5
      })
    });
  }

  updateTimeLine(): void {
    this.timeLineCurrentForm = {
      classId: this.data.clazzId,
      day: this.newTimeLineForm.value.day,
      subjectId1: this.newTimeLineForm.value.subject1,
      subjectId2: this.newTimeLineForm.value.subject2,
      subjectId3: this.newTimeLineForm.value.subject3,
      subjectId4: this.newTimeLineForm.value.subject4,
      subjectId5: this.newTimeLineForm.value.subject5
    }
    this.commonService.updateTimeLine(this.timeLineCurrentForm).subscribe(response => {
      this.showSnackBarEdit();
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSnackBarEdit() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("This time-line was update successfully", "X", config);
  }

}
