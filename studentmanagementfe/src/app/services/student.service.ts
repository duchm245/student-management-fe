import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_ADD_STUDENT = 'http://localhost:8080/api/createStudent';
  private API_UPDATE_STUDENT = 'http://localhost:8080/api/updateStudent';
  // private API_DELETE_STUDENT = 'http://localhost:8080/api/deleteStudent';
  private API_DELETE_SOFT_STUDENT = 'http://localhost:8080/api/deleteSoftStudent';
  private API_GET_STUDENT_BY_ID = 'http://localhost:8080/api/getStudent/';
  private REST_API_SERVER_LIST_STUDENT_BY_FILTER = 'http://localhost:8080/api/getAllStudentsByFilter';
  private API_CHECK_EMAIL_EXIST = 'http://localhost:8080/api/checkEmailExist/';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Authorization: 'my-auth-token
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Hàm này dùng để tạo mới một học sinh
   * @param data
   */
  public create(data: any): Observable<Student> {
    const url = `${this.API_ADD_STUDENT}`;
    return this.httpClient.post(url, data);
  }

  /**
   * Hàm này dùng để lấy ra một học sinh theo id
   * @param id
   */
  public getStudentById(id: any): Observable<any> {
    const url = `${this.API_GET_STUDENT_BY_ID}` + id;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để update một học sinh
   * @param id
   * @param data
   */
  public update(id: any, data: any): Observable<any> {
    const url = `${this.API_UPDATE_STUDENT}`;
    return this.httpClient.put(`${url}/${id}`, data);
  }

  /**
   * Hàm này sẽ xóa hoàn toàn một học sinh ra khỏi cơ sở dữ liệu
   * @param id
   */
  // public delete(id: any): Observable<any> {
  //   const url = `${this.API_DELETE_STUDENT}`;
  //   return this.httpClient.delete(`${url}/${id}`);
  // }

  /**
   * Hàm này sẽ xóa mềm, chỉ thay đổi trạng thái từ hoạt động -> không hoạt động
   * @param id
   */
  public delete(id: any): Observable<any> {
    const url = `${this.API_DELETE_SOFT_STUDENT}`;
    return this.httpClient.post(`${url}/${id}`, this.httpOptions);
  }

  // public deleteAll(): Observable<any> {
  //   const url = `${this.API_DELETE_ALL_STUDENT}`;
  //   return this.httpClient.delete(url);

  // }



  /**
   * Hàm này dùng để lấy ra danh sách học sinh theo bộ lọc
   * @param data
   */
  public getListStudentsFilter(data: any): Observable<any> {
    const url = `${this.REST_API_SERVER_LIST_STUDENT_BY_FILTER}`;
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: data
    }
    return this.httpClient.get<any>(url, option);
  }

  /**
   * Hàm này dùng để kiểm tra một email đã được sử dụng chưa
   * @param email
   */
  public checkEmailExists(email: any): Observable<any> {
    const url = `${this.API_CHECK_EMAIL_EXIST}` + email;
    return this.httpClient.get<any>(url, this.httpOptions)
  }

}
