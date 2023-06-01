import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ClazzService} from "../../services/clazz.service";
import {AddClazzDialogComponent} from "./clazz-add-dialog/add-clazz-dialog.component";
import {ClassEditDialogComponent} from "./class-edit-dialog/class-edit-dialog.component";


@Component({
  selector: 'app-clazz-page',
  templateUrl: './clazz-page.component.html',
  styleUrls: ['./clazz-page.component.scss']
})
export class ClazzPageComponent implements OnInit {

  public listClazzFromApi: any;
  public inputSearchName: any = '';
  public inputSearchType: any = 2;
  public inputSearchStatus: any = 2;
  public sortSelected: any = 'id';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private clazzService: ClazzService,
              private router: Router,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  // Hàm mở popup thêm học sinh
  openAddClazzDialog() {
    const dialogRef = this.dialog.open(AddClazzDialogComponent, {
      width: '1200px', // Định nghĩa kích thước của popup
      height: '500px'
    });

    // Theo dõi sự kiện đóng popup
    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả khi đóng popup (nếu cần)
      this.search();
    });
  }

  openEditClazzDialog(clazzId: any) {
    const dialogRef = this.dialog.open(ClassEditDialogComponent, {
      width: '1200px', // Định nghĩa kích thước của popup
      height: '500px',
      data: {clazzId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }


  ngOnInit(): void {
    this.search();
  }

  public search() {
    const name = this.inputSearchName;
    const type = this.inputSearchType;
    const status = this.inputSearchStatus;
    const sortSelected = this.sortSelected;
    const page = this.page;
    const pageSize = this.pageSize;

    const data: Record<string, any> = {
      "name": name,
      "type": type,
      "status": status,
      "sortSelected": sortSelected,
      "page": page,
      "pageSize": pageSize,
    }

    this.clazzService.getListClazzFilter(data).subscribe(data => {
      if (!data.data) {
        this.listClazzFromApi = [];
        this.count = 0;
        return;
      }
      this.listClazzFromApi = data.data;
      this.count = data.totalItems;
    }, error => {
      alert("Hệ thống lỗi, vui lòng thử lại sau");
      this.listClazzFromApi = null;
    })
  }

  public changeStatus(event: any) {
    this.inputSearchStatus = event.target.value;
    this.search();
  }

  public changeSort(event: any) {
    this.sortSelected = event.target.value;
    this.search();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.search();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.search();
  }

  public deleteClazz(studentId: any): void {
    this.clazzService.delete(studentId).subscribe(reponse => {
      this.showSnackBarDelete();
      this.search();
      this.router.navigate(['/clazz']);
    }, error => {
      console.log(error);
    })
  }

  showSnackBarDelete() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Lớp này đã không còn hoạt động", "X", config);
  }

}

