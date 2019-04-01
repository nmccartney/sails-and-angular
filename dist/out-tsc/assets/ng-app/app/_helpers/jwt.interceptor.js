var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // console.log('intercepting : ', request);
        // console.log('cur ', localStorage.getItem('token'));
        // add authorization header with jwt token if available
        // let token = JSON.parse(localStorage.getItem('token'));
        var token = localStorage.getItem('token');
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
    };
    JwtInterceptor = __decorate([
        Injectable()
    ], JwtInterceptor);
    return JwtInterceptor;
}());
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map