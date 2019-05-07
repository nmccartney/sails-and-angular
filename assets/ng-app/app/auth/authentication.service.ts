import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// var jwt = require('jsonwebtoken');
import jwt_decode from 'jwt-decode';
import { environment } from 'ng-app/environments/environment';
import { Subject } from 'rxjs';

const URL:string = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private _isAuthenticated = new Subject();
  private _token:any;

  get token(){return this._token;}
  set token(value:any) {this._token = value;}


  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.token = localStorage.getItem('token');
    console.log('token : ', this.token);
  }

  checkIn() {
    return this.http
      .get<any>(`${URL}/check-in`)
      .pipe(map(resp => {
        console.log('got resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.token) {
          console.log(`got checkin - ${resp.user}`, resp);
        }

        return resp;
      }));
  }

  isAuthenticated() {
    // console.log('token : ',token);
    if (!this.token) {
      this._isAuthenticated.next(false);
      return false;
    }
    // console.log('decoded : ',jwt_decode(token));
    // Check whether the token is expired and return
    // true or false
    this._isAuthenticated.next(true);
    return true;
    // return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${URL}/login`, { username, password })
      .pipe(map(resp => {
        console.log('got resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.token && resp.user) {
          console.log('got user - ', resp.user);
          console.log('got token - ', resp.token);
          this.token = resp.token;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(resp.token));
          localStorage.setItem('currentUser', JSON.stringify(resp.user));
        }

        return resp.user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');

    return this.http
      .get<any>(`${URL}/logout`)
      .pipe(map(resp => {
        console.log('got logout resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.logout) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.token = null;
        }

        return resp.user;
      }));
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${URL}/register`, { username, password })
      .pipe(map(resp => {
        console.log('got user - ', resp);
        // login successful if there's a jwt token in the response
        if (resp.user && resp.user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp.user));
        }

        return resp.user;
      }));
  }
}
