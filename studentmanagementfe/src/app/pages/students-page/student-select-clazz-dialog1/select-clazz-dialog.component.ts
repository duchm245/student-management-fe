// import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
// import {StudentService} from "../../services/student.service";
// import {MyErrorStateMatcher} from "../../pages/clazz-page/clazz-add-dialog/add-clazz-dialog.component";
// import {FormControl, FormGroup} from "@angular/forms";
// import {ClazzService} from "../../services/clazz.service";
// import {ReplaySubject} from "rxjs";
// import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
// import {CommonService} from "../../services/common.service";
//
// export interface Class {
//   id: string,
//   name: string
// }
//
// @Component({
//   selector: 'app-select-clazz-dialog',
//   templateUrl: './select-clazz-dialog.component.html',
//   styleUrls: ['./select-clazz-dialog.component.scss']
// })
// export class SelectClazzDialogComponent implements OnInit {
//   public clazzId: any = "";
//   public submitted = false;
//   public matcher = new MyErrorStateMatcher();
//   public listClassFromApi: Class[] = [];
//   public classFilterCtrl: FormControl<string | null> = new FormControl<string>('');
//   public filteredClass: ReplaySubject<Class[]> = new ReplaySubject<Class[]>(1);
//   public newSelectClazzForm = new FormGroup({
//     clazzId: new FormControl(''),
//     studentId: new FormControl('')
//   })
//
//   constructor(private studentService: StudentService,
//               private clazzService: ClazzService,
//               private commonService: CommonService,
//               public dialogRef: MatDialogRef<SelectClazzDialogComponent>, // lấy biến stId từ GetListStudentComponent
//               private _snackBar: MatSnackBar,
//               @Inject(MAT_DIALOG_DATA) public data: { stId: any } // Inject giá trị từ data của GetListStudentComponent vào đây
//   ) {
//   }
//
//   ngOnInit(): void {
//     this.clazzService.getAllListClazz().subscribe(data => {
//       this.listClassFromApi = data.data;
//       console.log("this.list class : " + JSON.stringify(this.listClassFromApi));
//     });
//     this.commonService.getClazzIdByStudentId(this.data.stId).subscribe(data => {
//       this.clazzId = data.data.classId;
//       this.newSelectClazzForm.controls.clazzId.setValue(data.data.classId);
//     })
//
//     this.classFilterCtrl.valueChanges.subscribe(() => {
//       this.filterClasses();
//     });
//     setTimeout(() => {
//       this.filterClasses();
//     }, 200)
//   }
//
//
//   public filterClasses() {
//     let search = this.classFilterCtrl.value;
//     if (!search) {
//       this.filteredClass.next(this.listClassFromApi.slice());
//       return;
//     } else {
//       search = search.toLowerCase();
//     }
//     this.filteredClass.next(
//       this.listClassFromApi.filter(bank => bank.name.toLowerCase().indexOf(typeof search === "string" ? search : "") > -1)
//     );
//   }
//
//   public selectClazz() {
//     const data = {
//       classId: this.newSelectClazzForm.value.clazzId,
//       studentId: this.data.stId
//     }
//     console.log("data: " + JSON.stringify(data));
//     this.commonService.selectClazz(data).subscribe(() => {
//       this.submitted = true;
//     }, error => {
//       console.log(error);
//     })
//     // this.toastrService.success('Student was submitted successfully!!');
//     // this._snackBar.open("Lưu học sinh thành công", "exit", {duration: 2000});
//     this.showSnackBar();
//     this.dialogRef.close();
//   }
//
//   showSnackBar() {
//     const config = new MatSnackBarConfig();
//     config.duration = 5000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
//     config.horizontalPosition = 'end'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
//     config.verticalPosition = 'top'; // Tùy chọn vị trí dọc ('top', 'bottom')
//
//     this._snackBar.open("Lưu học sinh thành công", "exit", config);
//   }
//
// }
//
//
//
