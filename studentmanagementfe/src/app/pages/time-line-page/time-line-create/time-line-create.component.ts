import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {TimeLineComponent} from "../time-line/time-line.component";
import {Class} from "../../students-page/student-select-clazz-dialog2/select-clazz-dialog2.component";
import {ClazzService} from "../../../services/clazz.service";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-time-line-create',
  templateUrl: './time-line-create.component.html',
  styleUrls: ['./time-line-create.component.scss']
})
export class TimeLineCreateComponent {

  public classId: any;
  public submitted = false;

  public listClassFromApi: Class[] = [];
  public days: any[] = [
    {value: 2, viewValue: "Monday"},
    {value: 3, viewValue: "Tuesday"},
    {value: 4, viewValue: "Wednesday"},
    {value: 5, viewValue: "Thursday"},
    {value: 6, viewValue: "Friday"},
    {value: 7, viewValue: "Saturday"}
  ]
  public subjectsOfDayFromApi: any;
  public matcher = new MyErrorStateMatcher();
  public newSelectClazzForm = new FormGroup({
    clazzId: new FormControl(0, [Validators.required])
  })
  public newTimeLineForm = new FormGroup({
    clazzId: new FormControl(0, [Validators.required]),
    day: new FormControl(0, [Validators.required]),
    subject1: new FormControl(0, [Validators.required]),
    subject2: new FormControl(0, [Validators.required]),
    subject3: new FormControl(0),
    subject4: new FormControl(0),
    subject5: new FormControl(0)
  })
  public timeLineCurrentForm: any;

  constructor(private commonService: CommonService,
              private clazzService: ClazzService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<TimeLineComponent>) {
  }

  ngOnInit(): void {
    this.clazzService.getAllListClazz().subscribe(data => {
      this.listClassFromApi = data.data;
    })
    this.commonService.getAllSubject().subscribe(data => {
      this.subjectsOfDayFromApi = data.data;
    });
  }

  createTimeLine(): void {
    this.timeLineCurrentForm = {
      classId: this.newSelectClazzForm.value.clazzId,
      day: this.newTimeLineForm.value.day,
      subjectId1: this.newTimeLineForm.value.subject1,
      subjectId2: this.newTimeLineForm.value.subject2,
      subjectId3: this.newTimeLineForm.value.subject3,
      subjectId4: this.newTimeLineForm.value.subject4,
      subjectId5: this.newTimeLineForm.value.subject5
    }
    console.log("time line current : " + this.timeLineCurrentForm);
    this.commonService.createTimeLine(this.timeLineCurrentForm).subscribe(response => {
      this.showSnackBarCreate();
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSnackBarCreate() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Đã tạo thời khóa biểu thành công", "X", config);
  }
}
