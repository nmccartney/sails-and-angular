var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
    }
    AuthenticationService.prototype.checkIn = function () {
        return this.http
            .get("http://localhost:1337/check-in")
            .pipe(map(function (resp) {
            console.log('got resp - ', resp);
            // login successful if there's a jwt token in the response
            if (resp && resp.token) {
                console.log('got checkin - ', resp.user);
            }
            return resp;
        }));
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem('token');
        // console.log('token : ',token);
        if (!token)
            return false;
        // console.log('decoded : ',jwt_decode(token));
        // Check whether the token is expired and return
        // true or false
        return true;
        // return !this.jwtHelper.isTokenExpired(token);
    };
    AuthenticationService.prototype.login = function (username, password) {
        return this.http
            .post("http://localhost:1337/login", { username: username, password: password })
            .pipe(map(function (resp) {
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
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        return this.http
            .get("http://localhost:1337/logout")
            .pipe(map(function (resp) {
            console.log('got logout resp - ', resp);
            // login successful if there's a jwt token in the response
            if (resp && resp.logout) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
            }
            return resp.user;
        }));
    };
    AuthenticationService.prototype.register = function (username, password) {
        return this.http.post("http://localhost:1337/register", { username: username, password: password })
            .pipe(map(function (resp) {
            console.log('got user - ', resp);
            // login successful if there's a jwt token in the response
            if (resp.user && resp.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(resp.user));
            }
            return resp.user;
        }));
    };
    AuthenticationService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [HttpClient, JwtHelperService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map