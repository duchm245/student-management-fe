import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {SERVER_API_URL} from "../../utils/app.constants";
import {StorageService} from "../../core/services/storage/storage.service";
import {StorageKey} from "../../core/services/storage/storage.model";
import {CrudService} from "../../core/services/http/crud.service";

const AUTH_API = 'http://localhost:8080/api/';
const {AUTH_TOKEN} = StorageKey;


@Injectable({
  providedIn: 'root'
})
export class AuthService extends CrudService {
  endpoint = 'login';
  override url = SERVER_API_URL + 'api';
  token: string;
  // redirectUrl: string;
  redirectUrl: any;
  httpOptions: any;
  isLoggedIn: boolean | any;

  constructor(http: HttpClient, private storage: StorageService, private router: Router) {
    super(http);
    this.token = this.storage.read(AUTH_TOKEN) || '';

    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   'Access-Control-Allow-Origin': 'http://localhost:4200',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    // };
  }

  // login(obj: any): Observable<any> {
  //   return this.http.post(AUTH_API + 'login', {
  //     username: obj.username,
  //     password: obj.password
  //   }, this.httpOptions);
  // }

  public async login(username: string, password: string) {
    try {
      // let response = {id_token: ''};
      type Response = {
        tokenType: string,
        accessToken: string
      }
      // tslint:disable-next-line:object-literal-shorthand
      const response = await this.post({username: username, password: password});
      // this.token = response.id_token;
      this.token = `${response.tokenType} ${response.accessToken}`;
      this.storage.save(AUTH_TOKEN, this.token);
      return this.redirectUrl;
    } catch (error) {
      console.error('Error during login request', error);
      return Promise.reject(error);
    }
  }

  public getToken(): string {
    return this.token;
  }

  public logout() {
    this.token = '';
    this.storage.remove(AUTH_TOKEN);
    this.router.navigate(['login'], {replaceUrl: true});
  }

  public isLogged(): boolean {
    return this.token.length > 0;
  }

  resetPassword(mail: string): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/account/reset-password/init', mail);
  }

  // =========================================
  // register(obj: any): Observable<any> {
  //   console.log(obj);
  //   return this.http.post(AUTH_API + 'signup', {
  //     bookId: obj.book_id,
  //     name: obj.name,
  //     gender: obj.gender,
  //     dateOfBirth: obj.dateOfBirth,
  //     guardian: obj.guardian,
  //     address: obj.address,
  //     phone: obj.phone,
  //     email: obj.email,
  //     password: obj.password,
  //   }, this.httpOptions);
  // }
  //
  // verify(code: string): Observable<any> {
  //   console.log(code);
  //   return this.http.post(AUTH_API + 'verify', {
  //     code: code
  //   }, this.httpOptions);
  // }
  //
  // verifyPassword(code: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'verify-password', {
  //     code: code
  //   }, this.httpOptions);
  // }
  //
  //
  // doResetPassword(password: string, code: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'do-reset-password', {
  //     password: password,
  //     code: code
  //   }, this.httpOptions);
  // }
}
