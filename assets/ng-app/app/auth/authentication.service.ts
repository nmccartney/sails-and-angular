import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// var jwt = require('jsonwebtoken');
import jwt_decode from 'jwt-decode';

const DEV_URL:string = 'localhost';
const PROD_URL:string = '142.93.194.138';
const DEV_PORT:string = '1337';
const PROD_PORT:string = '80';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  url: string = !isDevMode ? PROD_URL : DEV_URL;
  port: string = !isDevMode ? PROD_PORT : DEV_PORT;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {

  }

  checkIn() {
    return this.http
      .get<any>(`http://${this.url}:${this.port}/check-in`)
      .pipe(map(resp => {
        console.log('got resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.token) {
          console.log('got checkin - ', resp.user);
        }

        return resp;
      }));
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    // console.log('token : ',token);
    if (!token) return false;
    // console.log('decoded : ',jwt_decode(token));
    // Check whether the token is expired and return
    // true or false
    return true;
    // return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`http://${this.url}:${this.port}/login`, { username, password })
      .pipe(map(resp => {
        console.log('got resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.token && resp.user) {
          console.log('got user - ', resp.user);
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
      .get<any>(`http://${this.url}:${this.port}/logout`)
      .pipe(map(resp => {
        console.log('got logout resp - ', resp);
        // login successful if there's a jwt token in the response
        if (resp && resp.logout) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
        }

        return resp.user;
      }));
  }

  register(username: string, password: string) {
    return this.http.post<any>(`http://${this.url}:${this.port}/register`, { username, password })
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
