import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access-token') != null || true) {
      console.log('Interceptor');
      const token = localStorage.getItem('access-token') || "no access token :<";
      const headers = new HttpHeaders()
        .set('access-token', token)
        .set('Authorization', 'Bearer ' + token);
      const AuthRequest = request.clone({headers: headers});
      return next.handle(AuthRequest);
    } else {
      return next.handle(request);
    }
  }
}
