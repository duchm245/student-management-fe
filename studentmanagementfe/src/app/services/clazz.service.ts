import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClazzService {
  private API_ADD_CLAZZ = 'http://localhost:8080/api/createClazz';
  private API_LIST_CLASS = 'http://localhost:8080/api/getAllClazz';
  private API_GET_CLASS_BY_ID = 'http://localhost:8080/api/getClassById/';
  private API_LIST_CLAZZ_BY_FILTER = 'http://localhost:8080/api/getAllClazzByFilter';
  private API_LIST_CLAZZ_BY_FILTER_LIKE_CLASS_NAME = 'http://localhost:8080/api/getAllClazzByFilterLikeClassName';
  private API_UPDATE_CLAZZ = 'http://localhost:8080/api/updateClazz';
  private API_DELETE_CLAZZ = 'http://localhost:8080/api/deleteClazz';
  private API_DELETE_SOFT_CLAZZ = 'http://localhost:8080/api/deleteSoftClazz';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Authorization: 'my-auth-token
    })
  }

  constructor(private http: HttpClient) {
  }

  /**
   * Hàm này dùng để tạo mới một lớp học
   * @param data
   */
  public create(data: any): Observable<any> {
    const url = `${this.API_ADD_CLAZZ}`;
    return this.http.post(url, data);
  }

  /**
   * Hàm này dùng để lấy ra danh sách tất cả các lớp học
   */
  public getAllListClazz(): Observable<any> {
    const url = `${this.API_LIST_CLASS}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  /**
   * Hâm này dùng để lấy ra danh sách lớp học theo bộ lọc
   * @param data
   */
  public getListClazzFilter(data: any): Observable<any> {
    const url = `${this.API_LIST_CLAZZ_BY_FILTER}`;
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), params: data
    };
    return this.http.get<any>(url, option);
  }

  /**
   * Hàm này dùng để chỉnh sửa một lớp học theo id
   * @param data
   */
  public updateClazzById(data: any): Observable<any> {
    const url = `${this.API_UPDATE_CLAZZ}`;
    return this.http.put(`${url}`, data);
  }

  /**
   * Hàm này dùng để xóa mêm một lớp học (chỉ thay đổi trạng thái status -> không hoạt động)
   * @param id
   */
  public delete(id: any): Observable<any> {
    const url = `${this.API_DELETE_SOFT_CLAZZ}`;
    return this.http.post(`${url}/${id}`, this.httpOptions);
  }

  /**
   * Hàm này dùng để lấy ra danh sách lớp học khi người dùng tìm kiếm theo một tên giống / gần giống với tên lớp
   * @param className
   */
  public getListClazzFilterLikeClassName(className: any): Observable<any> {
    const url = `${this.API_LIST_CLAZZ_BY_FILTER_LIKE_CLASS_NAME}`;
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        className: className
      }
    };
    return this.http.get<any>(url, option);
  }

  /**
   * Hàm này dùng để lấy ra danh sách lớp học theo id
   * @param classId
   */
  public getClazzById(classId: any): Observable<any> {
    const url = `${this.API_GET_CLASS_BY_ID}` + classId;
    return this.http.get<any>(url, this.httpOptions);
  }

}
