import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('intercepting : ', request);
    // console.log('cur ', localStorage.getItem('token'));
    // add authorization header with jwt token if available
    // let token = JSON.parse(localStorage.getItem('token'));
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          // Authorization: `bearer ${token}`
          Authorization: token
        }
      });
    }

    // console.log('intercepting : ', request);

    return next.handle(request);
  }
}
