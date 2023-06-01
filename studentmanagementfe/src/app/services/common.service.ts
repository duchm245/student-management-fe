import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private API_SELECT_CLAZZ = 'http://localhost:8080/api/createClazzStudent';
  private API_CREATE_TIMELINE = 'http://localhost:8080/api/createTimeLine';
  private API_GET_CLAZZ_BY_STUDENT_ID = 'http://localhost:8080/api/getClazzIdByStudentId?studentId=';
  private API_GET_TIMELINE_BY_FILTER = 'http://localhost:8080/api/getTimeLineByFilter?classId=';
  private API_GET_ALL_SUBJECT = 'http://localhost:8080/api/getAllSubject';
  private API_GET_TIMELINE_MONDAY = 'http://localhost:8080/api/getTimeLineMonday?clazzId=';
  private API_GET_SCHEDULE_EXAM = 'http://localhost:8080/api/getScheduleExam?clazzId=';
  private API_GET_MARK2 = 'http://localhost:8080/api/getMarkByFilter2';
  private API_GET_MARK3 = 'http://localhost:8080/api/getMarkByFiler3';
  private API_UPDATE_TIMELINE = 'http://localhost:8080/api/updateTimeLine';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Authorization: 'my-auth-token
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Hàm này dùng để lấy ra bản ghi từ bảng class_student theo studentId và status là đang hoạt động
   * @param studentId
   */
  public getClazzIdByStudentId(studentId: any): Observable<any> {
    const url = `${this.API_GET_CLAZZ_BY_STUDENT_ID}` + studentId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để phân lớp một học sinh vào một lớp tương ứng
   * @param data
   */
  public selectClazz(data: any): Observable<any> {
    const url = `${this.API_SELECT_CLAZZ}`;
    return this.httpClient.post(`${url}`, data);
  }

  /**
   * Hàm này dùng để tạo thời khóa biểu
   * @param data
   */
  public createTimeLine(data: any): Observable<any> {
    const url = `${this.API_CREATE_TIMELINE}`;
    return this.httpClient.post(url, data);
  }

  /**
   * Hàm này dùng để lấy ra toàn bộ thời khóa biểu theo bộ lọc
   * @param classId
   */
  public getAllTimeLineByFilter(classId: any): Observable<any> {
    const url = `${this.API_GET_TIMELINE_BY_FILTER}` + classId;
    console.log('url subject: ', url);
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để update TKB của lớp theo thứ
   * @param tl
   */
  public updateTimeLine(data: any): Observable<any> {
    const url = `${this.API_UPDATE_TIMELINE}`;
    return this.httpClient.put(`${url}`, data);
  }

  /**
   * Hàm này dùng để lấy ra danh sách tất cả môn học
   */
  public getAllSubject(): Observable<any> {
    const url = `${this.API_GET_ALL_SUBJECT}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để lấy ra thông tin thời khóa biểu của thứ hai
   * @param clazzId
   */
  public getTimeLineMonday(clazzId: any): Observable<any> {
    const url = `${this.API_GET_TIMELINE_MONDAY}` + clazzId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để lấy ra thông tin của một lớp
   * @param clazzId
   */
  public getScheduleExamByClazzId(clazzId: any): Observable<any> {
    const url = `${this.API_GET_SCHEDULE_EXAM}` + clazzId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /**
   * Hàm này dùng để lấy ra điểm các môn của một học sinh
   * @param data
   */
  public getMarkFilter2(data: any): Observable<any> {
    const url = `${this.API_GET_MARK2}`;
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: data
    }
    return this.httpClient.get<any>(url, option);
  }

  /**
   * Hàm này dùng để lấy ra điểm của tất cả học sinh trong một lớp
   * @param data
   */
  public getMarkFilter3(data: any): Observable<any> {
    const url = `${this.API_GET_MARK3}`;
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: data
    }
    return this.httpClient.get<any>(url, option);
  }

  // getInfoExam(data: any): Observable<any> {
  //   const url = `${this.API_GET_MARK}`;
  //   const option = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: data
  //   }
  //   return this.httpClient.get<any>(url, option);
  // }


}
