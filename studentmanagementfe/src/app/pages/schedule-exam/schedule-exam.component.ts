

import {Component, OnInit} from '@angular/core';
import {ClazzService} from "../../services/clazz.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.scss']
})
export class ScheduleExamComponent implements OnInit {
  public classId: any = 1;
  public listClassFromApi: any;

  public listScheduleExamFromApi: any;

  constructor(private clazzService: ClazzService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.clazzService.getAllListClazz().subscribe(clazz => {
      this.listClassFromApi = clazz.data;
    })
    this.getInfoScheduleExam();
  }

  public changeClass(event: any) {
    this.classId = event.target.value;
    this.getInfoScheduleExam();
  }

  public getInfoScheduleExam() {
    if (this.classId == null || this.classId == "") {
      alert("Vui lòng chọn lớp");
      return;
    }
    this.commonService.getScheduleExamByClazzId(this.classId).subscribe(result => {
      this.listScheduleExamFromApi = result.data;

      if (this.listScheduleExamFromApi == null || this.listScheduleExamFromApi == "") {
        setTimeout(function () {
          alert("Lớp này chưa có lịch thi")
        }, 200)
      }
    }, error => {
      console.log(error);
      alert("Hệ thống lỗi, vui lòng thử lại sau!");
      this.listScheduleExamFromApi = null;
    })
  }

}
