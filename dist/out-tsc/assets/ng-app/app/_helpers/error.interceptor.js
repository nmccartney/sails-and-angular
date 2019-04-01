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
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        // console.log('error intercept : ', request);
        var _this = this;
        return next.handle(request).pipe(catchError(function (err) {
            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                _this.authenticationService.logout();
                // location.reload(true);
                _this.router.navigate(['/']);
            }
            // const error = err.error.message || err.statusText;
            return throwError(err);
        }));
    };
    ErrorInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
export { ErrorInterceptor };
//# sourceMappingURL=error.interceptor.js.map