import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Student} from "../../../models/student.model";
import {DatePipe} from "@angular/common";
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  stId: any;
  message = '';
  public studentFromApi: any;
  currentStudent: Student = {};
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
    {value: 1, viewValue: 'Nam'},
    {value: 0, viewValue: 'Nữ'},
    {value: 2, viewValue: 'Khác'},
  ];

  statuses: any[] = [
    {value: 1, viewValue: "Hoạt động"},
    {value: 0, viewValue: "Không hoạt động"},
  ]

  newStudentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\s]{1,50}$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\s]{1,50}$')]),
    code: new FormControl('', [Validators.required]),
    gender: new FormControl(0, [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required, Validators.pattern('^.{1,50}$')  ]),
    status: new FormControl(0, [Validators.required]),
  })

  constructor(private studentService: StudentService, private datePipe: DatePipe,
              private route: ActivatedRoute, private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stId = +params['id'];
    });

    this.studentService.getStudentById(this.stId).subscribe(data => {
      this.studentFromApi = data.data;
      console.log("student from Api: ", this.studentFromApi);

      // Đặt giá trị cho các trường trong newStudentForm
      this.newStudentForm.setValue({
        firstName: this.studentFromApi.firstName || '',
        lastName: this.studentFromApi.lastName || '',
        code: this.studentFromApi.code || '',
        gender: this.studentFromApi.sex,
        birthday: this.studentFromApi.birthday || '',
        email: this.studentFromApi.email || '',
        phone: this.studentFromApi.phone || '',
        address: this.studentFromApi.address || '',
        status: this.studentFromApi.status
      });
    });
  }


  updateStudent(): void {
    this.route.params.subscribe(params => {
      this.stId = +params['id'];
      console.log("st.id: " + this.stId)
    });

    this.currentStudent = {
      firstName: this.newStudentForm.value.firstName,
      lastName: this.newStudentForm.value.lastName,
      code: this.newStudentForm.value.code,
      sex: this.newStudentForm.value.gender,
      // dùng datePipe định dạng lại ngày để tránh bị lùi mất một ngày
      birthday: this.newStudentForm.value.birthday = this.datePipe.transform(this.newStudentForm.value.birthday, 'yyyy-MM-dd'),
      email: this.newStudentForm.value.email,
      phone: this.newStudentForm.value.phone,
      address: this.newStudentForm.value.address,
      status: this.newStudentForm.value.status,
    };

    console.log("student2: " + JSON.stringify(this.currentStudent));

    this.studentService.update(this.stId, this.currentStudent).subscribe(response => {
      console.log(response);
      this.message = response.message ? response.message : 'This student was updated successfully!';
      this.showSnackBarEdit();
      this.submitted = true;
      if (this.submitted) {
        this.router.navigate(['/getStudent']);
      }
    }, error => {
      console.log(error);
    })
  }

  showSnackBarEdit() {
    const config = new MatSnackBarConfig();
    config.duration = 5000; // Độ dài hiển thị của snackbar (tính theo milliseconds)
    config.horizontalPosition = 'center'; // Tùy chọn vị trí ngang ('start', 'center', 'end', 'left', 'right')
    config.verticalPosition = 'bottom'; // Tùy chọn vị trí dọc ('top', 'bottom')
    this._snackBar.open("Sửa học sinh thành công", "X", config);
  }

}
