import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../security/guards/auth.service";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formControlValidate = ['emailControl', 'passControl'];
  // email: string;
  email: any;
  password: any;
  errorMessage: any;
  successMessage: any;
  isLogin: boolean;
  isShowReset: boolean;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.isLogin = true;
    this.isShowReset = true;
  }

  ngOnInit() {
    this.errorMessage = '';
    if (this.authService.isLogged()) {
      this.navigateTo();
    }
    this.email = 'admin';
    this.password = '1234';
  }

  public async login(form: NgForm, email: string, password: string) {
    try {
      if (!form.valid) {
        this.formControlValidate.forEach(control => {
          form.controls[control].markAsTouched();
          form.controls[control].markAsDirty();
        });
        return;
      }

      const url = (await this.authService.login(
        email,
        password,
      )) as string;
      this.navigateTo(url);
    } catch (e) {
      this.errorMessage = 'Thông tin đăng nhập không đúng, vui lòng thử lại!';
    }
  }

  public navigateTo(url?: string) {
    url = url || 'home';
    this.router.navigate([url], { replaceUrl: true });
  }

  forgetPass(type: any): void{
    if(type){
      this.isLogin = false;
      this.email = '';
      this.password = '';
      this.errorMessage = '';
      this.successMessage = '';
      this.isShowReset = true;
    }else{
      this.email = '';
      this.password = '';
      this.errorMessage = '';
      this.successMessage = '';
      this.isLogin = true;
    }
  }
  resetPassword(): void{
    this.errorMessage = '';
    this.successMessage = '';
    if(this.email === '' || this.email.trim() === ''){
      return;
    }
    this.authService.resetPassword(this.email).subscribe(
      () => {
        this.successMessage = 'Vui lòng kiểm tra hòm thư để lấy lại mật khẩu truy cập TACHUDU.';
        this.isShowReset = false;
      },
      response => {
        this.errorMessage = 'Reset mật khẩu không thành công!';
      }
    );
  }
  resetForm(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isShowReset = true;
  }
}

