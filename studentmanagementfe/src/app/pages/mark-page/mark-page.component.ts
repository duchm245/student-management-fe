
import {Component, OnInit} from '@angular/core';
import {ClazzService} from "../../services/clazz.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-mark-page',
  templateUrl: './mark-page.component.html',
  styleUrls: ['./mark-page.component.scss']
})
export class MarkPageComponent implements OnInit {
  public classId: any = 1;
  public subjectId: any = 1;
  public listMark: any;
  public listClassFromApi: any;
  public listSubjectFromApi: any;

  constructor(private clazzService: ClazzService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.clazzService.getAllListClazz().subscribe(clazz => {
      this.listClassFromApi = clazz.data;
    })

    this.commonService.getAllSubject().subscribe(data => {
      this.listSubjectFromApi = data.data;
    })
    this.getInfoMark();
  }

  public changeClass(event: any) {
    this.classId = event.target.value;
    this.getInfoMark();
  }

  public changeSubject(event: any) {
    this.subjectId = event.target.value;
    this.getInfoMark();
  }

  public getInfoMark() {
    const classId = this.classId;
    const subjectId = this.subjectId;

    const data: Record<string, any> = {
      "clazzId": classId,
      "subjectId": subjectId
    };

    if (this.classId == null || this.classId == "") {
      alert("Vui lòng chọn lớp");
      return;
    }
    this.commonService.getMarkFilter3(data).subscribe(result => {
      this.listMark = result.data;

      if (this.listMark == null || this.listMark == "") {
        setTimeout(function () {
          alert("Chưa có điểm")
        }, 200)
      }
    }, error => {
      console.log(error);
      alert("Hệ thống lỗi, vui lòng thử lại sau!");
      this.listMark = null;
    })
  }

  /**
   * Phân tách các phẩn trong mảng cách nhau bởi 4 khoảng trắng
   * @param array
   */
  stringifyArray(array: any[]): string {
    if (array && array.length > 0) {
      return array.join("    ");
    } else {
      return '';
    }
  }

}
