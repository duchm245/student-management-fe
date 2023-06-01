import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ErrorStateMatcher} from "@angular/material/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {ClazzService} from "../../../services/clazz.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-clazz-dialog',
  templateUrl: './add-clazz-dialog.component.html',
  styleUrls: ['./add-clazz-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class AddClazzDialogComponent {
  submitted = false;
  matcher = new MyErrorStateMatcher();
  types: any[] = [
    {value: '1', viewValue: 'Offline'},
    {value: '0', viewValue: 'Online'},
  ];

  statusArr: any[] = [
    {value: '1', viewValue: 'Hoạt động'},
    {value: '0', viewValue: 'Không hoạt động'},
  ];

  clazz: any = {
    name: '',
    code: '',
    number: '',
    limitClass: '',
    type: '',
    status: '',
    description: '',
    startDate: '',
    endDate: '',
    address: '',
  }

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


  newClazzForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ0-9\\s]{1,50}$')]),
    code: new FormControl('', [Validators.required, Validators.pattern('^.{1,50}$')]),
    number: new FormControl('', [Validators.pattern('^[0-9]{1,2}$|^50$')]),
    limitClazz: new FormControl('', [Validators.pattern('^[0-9]{1,2}$|^50$')]),
    type: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.pattern('^.{1,200}$')]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    address: new FormControl('', [Validators.pattern('^.{1,50}$')]),
  }, { validators: this.dateValidator })

  constructor(private dialogRef: MatDialogRef<AddClazzDialogComponent>,
              private clazzService: ClazzService,
              private _snackBar: MatSnackBar) {
  }



  addClazz() {
    const data = {
      name: this.newClazzForm.value.name,
      code: this.newClazzForm.value.code,
      number: this.newClazzForm.value.number,
      limitClass: this.newClazzForm.value.limitClazz,
      type: this.newClazzForm.value.type,
      status: this.newClazzForm.value.status,
      description: this.newClazzForm.value.description,
      startDate: this.newClazzForm.value.startDate,
      endDate: this.newClazzForm.value.endDate,
      address: this.newClazzForm.value.address,
    }
    this.clazzService.create(data).subscribe(() => {
      this.submitted = true;
      this.showSnackBarAdd();
      this.closeDialog();
    }, error => {
      console.log(error);
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSnackBarAdd() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Thêm lớp thành công", "X", config);
  }

}
