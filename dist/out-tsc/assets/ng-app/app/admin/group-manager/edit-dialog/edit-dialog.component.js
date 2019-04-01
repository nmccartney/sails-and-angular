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
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// import { GroupService } from '../../group.service';
import { UserService } from 'ng-app/app/user/user.service';
import { first, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { GroupService } from 'ng-app/app/group/group.service';
var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(dialogRef, gs, us, bar, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.gs = gs;
        this.us = us;
        this.bar = bar;
        this.data = data;
        this.users = [];
        this.separatorKeysCodes = [ENTER, COMMA];
        this.userCtrl = new FormControl();
        this.allUsers = [];
        this.groupForm = this.createFormGroup();
        this.filteredUsers = this.userCtrl.valueChanges
            .pipe(startWith(null), map(function (user) {
            if (typeof user !== 'string') {
                return user ? _this._filter(user.username) : _this.allUsers.slice();
            }
            else {
                return user ? _this._filter(user) : _this.allUsers.slice();
            }
        }));
    }
    EditDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gs.findOne(this.data)
            .pipe(first())
            .subscribe(function (data) {
            console.log('get group success : ', data);
            _this.group = data;
            _this.users = data.users;
            _this.groupForm.controls.name.setValue(_this.group.name);
            _this.groupForm.controls.owner.setValue(_this.group.owner);
            _this.groupForm.controls.users.setValue(_this.group.users);
        }, function (error) {
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
        this.us.find()
            .subscribe(function (data) {
            _this.allUsers = data;
        }, function (error) {
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
    };
    EditDialogComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = __assign({}, this.group, this.groupForm.value);
        console.log(data);
        this.gs.edit(data).subscribe(function (data) {
            _this.dialogRef.close(data);
            _this.bar.open("Group " + _this.group.name + " updated!", 'Updated', { duration: 3000 });
        }, function (error) {
            _this.bar.open(error.message, 'Error', { duration: 3000 });
        });
    };
    EditDialogComponent.prototype.add = function (event) {
        var input = event.input;
        var value = event.value;
        // TODO - this condition adds input value which may not equate to a user
        // Add our user
        // if ((value || '').trim()) {
        // this.users.push(value.trim());
        // }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.userCtrl.setValue(null);
    };
    EditDialogComponent.prototype.remove = function (user) {
        var index = this.users.indexOf(user);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
        this.groupForm.controls.users.setValue(this.users);
    };
    EditDialogComponent.prototype.selected = function (event) {
        this.users.push(event.option.value);
        this.groupForm.controls.users.setValue(this.users);
        this.userInput.nativeElement.value = '';
        this.userCtrl.setValue(null);
    };
    EditDialogComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.allUsers.filter(function (user) {
            return user.username.toLowerCase().indexOf(filterValue) === 0;
        });
    };
    EditDialogComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            name: new FormControl(),
            owner: new FormControl(),
            users: new FormControl()
        });
    };
    var _a, _b;
    __decorate([
        ViewChild('userInput'),
        __metadata("design:type", ElementRef)
    ], EditDialogComponent.prototype, "userInput", void 0);
    EditDialogComponent = __decorate([
        Component({
            selector: 'app-edit-dialog',
            templateUrl: './edit-dialog.component.html',
            styleUrls: ['./edit-dialog.component.scss']
        }),
        __param(4, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, typeof (_a = typeof GroupService !== "undefined" && GroupService) === "function" && _a || Object, typeof (_b = typeof UserService !== "undefined" && UserService) === "function" && _b || Object, MatSnackBar, Object])
    ], EditDialogComponent);
    return EditDialogComponent;
}());
export { EditDialogComponent };
//# sourceMappingURL=edit-dialog.component.js.map