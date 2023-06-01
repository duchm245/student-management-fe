import {Component, Inject, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../clazz-page/clazz-add-dialog/add-clazz-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mark-dialog',
  templateUrl: './mark-dialog.component.html',
  styleUrls: ['./mark-dialog.component.scss']
})
export class MarkDialogComponent implements OnInit{
  studentName: any;
  studentCode: any;

  // public subjectId: any = 1;
  public listSubjectFromApi: any;
  public listExam: any;

  public matcher = new MyErrorStateMatcher();
  public newSelectSubjectForm = new FormGroup({
    subjectId: new FormControl(0, [Validators.required])
  })

  constructor(private commonService: CommonService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<MarkDialogComponent>,

              @Inject(MAT_DIALOG_DATA) public data: { stId: any, classId: any , studentName: any, studentCode: any} // Inject giá trị từ data của GetListStudentComponent vào đây
              ) {
  }

  ngOnInit(): void {
    this.studentName = this.data.studentName;
    this.studentCode = this.data.studentCode;
    this.commonService.getAllSubject().subscribe(data => {
      this.listSubjectFromApi = data.data;
    });
    this.getListExam();
    console.log("list exam  : " + JSON.stringify(this.listExam));

  }
  // public changeSubject() {
  //   this.subjectId = this.newSelectSubjectForm.value.subjectId;
  //   this.getListExam();
  // }

  getListExam() {
    const clazzId = this.data.classId;
    const studentId = this.data.stId;
    // const subjectId = this.subjectId;

    const data: Record<string, any> = {
      "clazzId": clazzId,
      // "subjectId": subjectId,
      "studentId": studentId,
    };
    console.log("data: " + JSON.stringify(data));
    this.commonService.getMarkFilter2(data).subscribe(result => {
      this.listExam = result.data;
      console.log("list exam  : " + JSON.stringify(this.listExam));
      if (this.listExam.length == 0) {
        // alert("Học sinh chưa có điểm");
        this.showSnackBar();
      }

    }, error => {
      alert("err");
      this.listExam = null;
    })
    // this.showSnackBar();
    // this.dialogRef.close();
  }

  showSnackBar() {
    const config = new MatSnackBarConfig();
    config.duration = 5000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Học sinh chưa có điểm", "exit", config);
  }


// Trong thành phần hoặc lớp của bạn
  stringifyArray(array: any[]): string {
    if (array && array.length > 0) {
      return array.join("    ");
    } else {
      return '';
    }
  }

}
