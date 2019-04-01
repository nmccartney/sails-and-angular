var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SailsClient } from 'ngx-sails';
var AppComponent = /** @class */ (function () {
    function AppComponent(sails) {
        this.sails = sails;
        this.title = 'ng-v6';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('sails - ', this.sails);
        this.sails.on('user').subscribe(function (res) {
            console.log('WB-user:', res);
        });
        this.sails.on('message').subscribe(function (res) {
            console.log('WB-message:', res);
        });
        this.sails.on('/message').subscribe(function (res) {
            console.log('WB-message:', res);
        });
        this.sails.requestErrors.subscribe(function (res) {
            console.log('WB-errors:', res);
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [SailsClient])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map