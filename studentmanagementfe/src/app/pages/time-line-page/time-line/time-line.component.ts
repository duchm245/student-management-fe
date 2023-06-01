import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {ClazzService} from "../../../services/clazz.service";
import {AddClazzDialogComponent} from "../../clazz-page/clazz-add-dialog/add-clazz-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TimeLineEditComponent} from "../time-line-edit/time-line-edit.component";
import {TimeLineCreateComponent} from "../time-line-create/time-line-create.component";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  public classId: any = 1;
  public startDate: any;
  public listClassFromApi: any;
  public listTimeLineFromApi: any;

  constructor(private commonService: CommonService,
              private clazzService: ClazzService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clazzService.getAllListClazz().subscribe(clazz => {
      this.listClassFromApi = clazz.data;
      this.classId = this.listClassFromApi[0].id;
      this.startDate = this.listClassFromApi[0].startDate;
      // console.log(this.classId);
      // console.log(this.startDate);
      // console.log(this.listClassFromApi);

      this.getAllTimeLineByFilter();
    })
  }

  public changeClass(event: any) {
    this.classId = event.target.value;

    // this.listClassFromApi.forEach((item: any) => {
    //   if (item.id == this.classId) {
    //     this.startDate = item.startDate;
    //     console.log("start date: " + this.startDate);
    //
    //   }
    // })

    const selectedClass = this.listClassFromApi.find((item: any) => item.id == this.classId);
    console.log("selectedClass: " + selectedClass);

    if (selectedClass) {
      this.startDate = selectedClass.startDate;
      console.log("start date: " + this.startDate);
    }

    this.getAllTimeLineByFilter();
  }


  /**
   * Hàm này để lấy ra danh sách thời khóa biểu theo lớp đã chọn
   */
  public getAllTimeLineByFilter() {
    if (this.classId == null || this.classId == "") {
      alert("Vui lòng chọn lớp");
      return;
    }
    this.commonService.getAllTimeLineByFilter(this.classId).subscribe(data => {
      this.listTimeLineFromApi = data.data;

      if (this.listTimeLineFromApi == null || this.listTimeLineFromApi == "") {
        setTimeout(function () {
          alert("Lớp này chưa có thời khóa biểu")
        }, 200)
      }
    }, error => {
      console.log(error)
      alert("Hệ thống lỗi, vui lòng thử lại sau!");
      this.listTimeLineFromApi = null;
    })
  }

  openEditTimeLineDialog(clazzId: any) {
    const dialogRef = this.dialog.open(TimeLineEditComponent, {
      width: '1200px', // Định nghĩa kích thước của popup
      height: '800px',
      data: {clazzId}
    });

    // Theo dõi sự kiện đóng popup
    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả khi đóng popup (nếu cần)
      this.getAllTimeLineByFilter();
    });
  }

  openCreateTimeLineDialog(clazzId: any) {
    const dialogRef = this.dialog.open(TimeLineCreateComponent, {
      width: '1200px', // Định nghĩa kích thước của popup
      height: '800px',
      data: {clazzId}
    });

    // Theo dõi sự kiện đóng popup
    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả khi đóng popup (nếu cần)
      this.getAllTimeLineByFilter();
    });
  }

}
