var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import { FormGroup, FormControl } from '@angular/forms';
// import { GroupService } from '../../group.service';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'ng-app/app/user/user.service';
import { GroupService } from 'ng-app/app/group/group.service';
var CreateDialogComponent = /** @class */ (function () {
    function CreateDialogComponent(dialogRef, gs, us) {
        this.dialogRef = dialogRef;
        this.gs = gs;
        this.us = us;
        this.groupForm = this.createFormGroup();
        var user = this.us.findMe() || '';
        this.owner = JSON.parse(user);
    }
    CreateDialogComponent.prototype.ngOnInit = function () {
    };
    CreateDialogComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            name: new FormControl(),
            owner: new FormControl(),
        });
    };
    CreateDialogComponent.prototype.submit = function () {
        var _this = this;
        console.log('creating group ', this.groupForm);
        var data = __assign({ owner: this.owner }, this.groupForm.value);
        this.gs.create(data).subscribe(function (data) {
            _this.dialogRef.close(data);
        }, function (error) {
            console.log('create group failed : ', error);
        });
    };
    var _a, _b;
    CreateDialogComponent = __decorate([
        Component({
            selector: 'app-create-dialog',
            templateUrl: './create-dialog.component.html',
            styleUrls: ['./create-dialog.component.scss']
        }),
        __metadata("design:paramtypes", [MatDialogRef, typeof (_a = typeof GroupService !== "undefined" && GroupService) === "function" && _a || Object, typeof (_b = typeof UserService !== "undefined" && UserService) === "function" && _b || Object])
    ], CreateDialogComponent);
    return CreateDialogComponent;
}());
export { CreateDialogComponent };
//# sourceMappingURL=create-dialog.component.js.map