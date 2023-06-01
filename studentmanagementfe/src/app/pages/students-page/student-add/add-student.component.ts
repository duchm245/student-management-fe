import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/student.model";
import {DatePipe} from "@angular/common";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {StudentService} from "../../../services/student.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  // emailExists$ = new BehaviorSubject<boolean>(false);
  emailExists: boolean = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  student: Student = {
    firstName: '',
    lastName: '',
    code: '',
    sex: '',
    birthday: '',
    email: '',
    phone: '',
    address: '',
    status: ''
  };
  genders: any[] = [
    {value: '1', viewValue: 'Nam'},
    {value: '0', viewValue: 'Nữ'},
    {value: '2', viewValue: 'Khác'},
  ];
  newStudentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\s]{1,50}$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\s]{1,50}$')]),
    code: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    phone: new FormControl('', [Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.pattern('^.{1,50}$')]),
    status: new FormControl(1),
  })

  constructor(private studentService: StudentService, private datePipe: DatePipe, private _snackBar: MatSnackBar) {
    // this.newStudentForm.get('birthday')?.setValue('2023-01-01');
  }

  ngOnInit(): void {
  }

  saveStudent(): void {
    const data = {
      firstName: this.newStudentForm.value.firstName,
      lastName: this.newStudentForm.value.lastName,
      code: this.newStudentForm.value.code,
      sex: this.newStudentForm.value.gender,
      birthday: this.newStudentForm.value.birthday = this.datePipe.transform(this.newStudentForm.value.birthday, 'yyyy-MM-dd'),
      email: this.newStudentForm.value.email,
      phone: this.newStudentForm.value.phone,
      address: this.newStudentForm.value.address,
      status: this.newStudentForm.value.status = 1,
    };
    this.studentService.create(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.showSnackBarAdd();
      this.newStudent();
    }, error => {
      console.log(error);
    });
  }

  newStudent(): void {
    this.submitted = false;
    this.student = {
      firstName: '',
      lastName: '',
      code: '',
      sex: '',
      birthday: '',
      email: '',
      phone: '',
      address: '',
      status: ''
    };
    this.newStudentForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      birthday: new FormControl(''),
      email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      phone: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(1),
    })
  }

  showSnackBarAdd() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Thêm học sinh thành công", "X", config);
  }

  checkEmailExist() {
    const email = this.newStudentForm.value.email || "";
    if (email) {
      this.studentService.checkEmailExists(email).subscribe(result => {
        this.emailExists = result.data;
        console.log("email exist1: " + this.emailExists);
      });
    }
    console.log("email exist2: " + this.emailExists)
    return true;  // Return true nếu email đã tồn tại, và false nếu không tồn tại
  }

}
