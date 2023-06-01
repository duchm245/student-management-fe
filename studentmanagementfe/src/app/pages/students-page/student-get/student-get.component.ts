import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {CommonService} from "../../../services/common.service";
import {ClazzService} from "../../../services/clazz.service";
import {StudentService} from "../../../services/student.service";
import {
  SelectClazzDialog2Component
} from "../student-select-clazz-dialog2/select-clazz-dialog2.component";
import {MarkDialogComponent} from "../student-mark-dialog/mark-dialog.component";


@Component({
  selector: 'app-student-get',
  templateUrl: './student-get.component.html',
  styleUrls: ['./student-get.component.scss']
})
export class StudentGetComponent implements OnInit {
  public listClassFromApi: any;
  public classSelected: any = 0;
  public listStudent: any;
  public inputSearchName: string = '';
  public inputSearchGender: number = 2;
  public inputSearchStatus: number = 2;
  public sortSelected: any = 'id';

  public message = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private httpServerService: CommonService,
              private clazzService: ClazzService,
              private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              public datePipe: DatePipe,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.clazzService.getAllListClazz().subscribe(data => {
      this.listClassFromApi = data.data;
      console.log("arrClazzFromApi: ", this.listClassFromApi);
    });
    this.search();
  }

  /**
   * This function is used to set classId when select class
   * @param event
   */
  public changeClass(event: any) {
    console.log("event.target.value: ", event.target.value);
    this.classSelected = event.target.value;
    this.search();
  }

  public changeGender(event: any) {
    this.inputSearchGender = event.target.value;
    this.search();
  }

  public changeStatus(event: any) {
    this.inputSearchStatus = event.target.value;
    this.search();
  }

  public changeSort(event: any) {
    this.sortSelected = event.target.value;
    this.search();
  }

  /**
   * Hàm này dùng để lọc, tìm kiếm và sắp xếp các học sinh theo tên, giới tính, trạng thái
   */
  search() {
    const name = this.inputSearchName;
    const gender = this.inputSearchGender;
    const status = this.inputSearchStatus;
    const classId = this.classSelected;
    const sortSelected = this.sortSelected;
    const page = this.page;
    const pageSize = this.pageSize;
    console.log("pageSize 1: " + pageSize);

    const data: Record<string, any> = {
      "classId": classId,
      "gender": gender,
      "status": status,
      "name": name,
      "sortSelected": sortSelected,
      "page": page,
      "pageSize": pageSize
    };

    if (name !== "") {
      data['name'] = name;
    }
    if (gender !== 2) {
      data['gender'] = gender;
    }
    if (status !== 2) {
      data['status'] = status;
    }
    if (sortSelected !== "id") {
      data['sortSelected'] = sortSelected;
    }

    this.studentService.getListStudentsFilter(data).subscribe(data => {
      if (!data.data) {
        this.listStudent = []
        this.count = 0
        setTimeout(function () {
          alert('Lớp này chưa có sinh viên')
        }, 200)
        return;
      }
      this.listStudent = data.data;
      this.count = data.totalItems;
    }, error => {
      alert('Hệ thống lỗi, vui lòng thử lại sau');
      this.listStudent = null
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.search();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.search();
  }

  public deleteStudent(studentId: any): void {
    this.studentService.delete(studentId).subscribe(response => {
      console.log("response : " + JSON.stringify(response));
      this.snackBarDelete();
      this.search();
      this.router.navigate(['/getStudent']);
    }, error => {
      console.log(error);
    })
  }

  // Hàm mở popup chọn lớp học
  openSelectClazzDialog2(stId: any, classId: any) {
    const dialogRef = this.dialog.open(SelectClazzDialog2Component, {
      width: '400px', // Định nghĩa kích thước của popup
      height: '200px',
      data: {stId: stId, classId: classId}
    });
    // Theo dõi sự kiện đóng popup
    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả khi đóng popup (nếu cần)
      this.search();
    });
  }

  // Hàm mở popup chọn lớp học
  openMark(stId: any, classId: any, studentName: any, studentCode: any) {
    const dialogRef = this.dialog.open(MarkDialogComponent, {
      width: '1920px', // Định nghĩa kích thước của popup
      height: '800px',
      data: {stId: stId, classId: classId, studentName: studentName, studentCode: studentCode}
    });
    // Theo dõi sự kiện đóng popup
    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả khi đóng popup (nếu cần)
      this.search();
    });
  }


  snackBarDelete() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Học sinh đã không còn hoạt động", "X", config);
  }


}
