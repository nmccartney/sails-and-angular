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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'ng-app/app/user/user.service';
var UserEditDialogComponent = /** @class */ (function () {
    function UserEditDialogComponent(bar, us, dialogRef, data) {
        this.bar = bar;
        this.us = us;
        this.dialogRef = dialogRef;
        this.data = data;
        this.user = data;
    }
    UserEditDialogComponent.prototype.ngOnInit = function () {
        this.userForm = this.createFormGroup();
        this.passwordForm = this.createPasswordFormGroup();
    };
    UserEditDialogComponent.prototype.onSubmit = function () {
        var _this = this;
        var data;
        try {
            data = __assign({}, this.user, this.userForm.value);
        }
        catch (error) {
            this.bar.open(error, 'Error', { duration: 3000 });
        }
        console.log('submitting : ', data);
        this.us.edit(data).subscribe(function (data) {
            _this.dialogRef.close(data);
            _this.bar.open("Event " + _this.user.username + " updated!", 'Updated', { duration: 3000 });
        }, function (error) {
            _this.bar.open(error.message, 'Error', { duration: 3000 });
        });
    };
    UserEditDialogComponent.prototype.createFormGroup = function () {
        console.log('creating form model : ', this.user);
        return new FormGroup({
            username: new FormControl(this.user && this.user.username || ''),
            uid: new FormControl({
                value: this.user && this.user.uid || '',
                disabled: true
            }),
            firstName: new FormControl(this.user && this.user.first_name || ''),
            LastName: new FormControl(this.user && this.user.last_name || ''),
        });
    };
    UserEditDialogComponent.prototype.createPasswordFormGroup = function () {
        console.log('creating form password model : ', this.user);
        return new FormGroup({
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', [Validators.required, this.passwordConfirming.bind(this)])
        });
    };
    UserEditDialogComponent.prototype.passwordConfirming = function (c) {
        if (!this.passwordForm)
            return;
        if (c.value !== this.passwordForm.get('password').value) {
            return { invalid: true };
        }
    };
    var _a;
    UserEditDialogComponent = __decorate([
        Component({
            selector: 'app-user-edit-dialog',
            templateUrl: './user-edit-dialog.component.html',
            styleUrls: ['./user-edit-dialog.component.scss']
        }),
        __param(3, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatSnackBar, typeof (_a = typeof UserService !== "undefined" && UserService) === "function" && _a || Object, MatDialogRef, Object])
    ], UserEditDialogComponent);
    return UserEditDialogComponent;
}());
export { UserEditDialogComponent };
//# sourceMappingURL=user-edit-dialog.component.js.map