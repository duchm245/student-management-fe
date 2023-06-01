import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ClazzService} from "../../../services/clazz.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MyErrorStateMatcher} from "../../students-page/student-edit/edit-student.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './class-edit-dialog.component.html',
  styleUrls: ['./class-edit-dialog.component.scss']
})
export class ClassEditDialogComponent implements OnInit {
  public clazzFromApi: any;
  public clazzCurrentForm: any;
  matcher = new MyErrorStateMatcher();
  public clazz: any = {
    id: '',
    name: '',
    code: '',
    number: '',
    limitClass: '',
    type: '',
    status: '',
    address: '',
    startDate: '',
    endDate: ''
  }

  public statuses: any[] = [
    {value: 1, viewValue: "Hoạt động"},
    {value: 0, viewValue: "Không hoạt động"},
  ]

  // Hàm validate startDate < endDate
  dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    // Kiểm tra nếu startDate và endDate đều có giá trị và startDate lớn hơn endDate
    if (startDate && endDate && startDate > endDate) {
      return { dateError: true };
    }
    return null;
  };
  public newClazzForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    number: new FormControl(''),
    limitClass: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
    address: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  }, { validators: this.dateValidator })

  constructor(private clazzService: ClazzService,
              private _snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private dialogRef: MatDialogRef<ClassEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { clazzId: any }) {
  } // Inject giá trị từ data của ClazzComponent vào đây

  ngOnInit(): void {
    this.clazzService.getClazzById(this.data.clazzId).subscribe(result => {
      this.clazzFromApi = result.data;
      // const formattedStartDate = this.datePipe.transform(this.clazzFromApi.startDate, 'yyyy-MM-dd');
      // const formattedEndDate = this.datePipe.transform(this.clazzFromApi.endDate, 'yyyy-MM-dd');
      // console.log(formattedStartDate)
      // console.log(formattedEndDate)

      this.newClazzForm.setValue({
        id: this.data.clazzId || '',
        name: this.clazzFromApi.name || '',
        code: this.clazzFromApi.code,
        number: this.clazzFromApi.number,
        limitClass: this.clazzFromApi.limitClass,
        type: this.clazzFromApi.type,
        status: this.clazzFromApi.status,
        address: this.clazzFromApi.address,
        startDate: this.clazzFromApi.startDate,
        endDate: this.clazzFromApi.endDate
      })
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateClazz(): void {
    this.clazzCurrentForm = {
      id: this.newClazzForm.value.id,
      name: this.newClazzForm.value.name,
      code: this.newClazzForm.value.code,
      number: this.newClazzForm.value.number,
      limitClass: this.newClazzForm.value.limitClass,
      type: this.newClazzForm.value.type,
      status: this.newClazzForm.value.status,
      address: this.newClazzForm.value.address,
      startDate: this.newClazzForm.value.startDate = this.datePipe.transform(this.newClazzForm.value.startDate, 'yyyy-MM-dd'),
      endDate: this.newClazzForm.value.endDate = this.datePipe.transform(this.newClazzForm.value.endDate, 'yyyy-MM-dd')
    }
    this.clazzService.updateClazzById(this.clazzCurrentForm).subscribe(response => {
      this.showSnackBarEdit();
      this.closeDialog();
    })
  }

  showSnackBarEdit() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Lớp này đã được cập nhật thành công", "X", config);
  }

}
