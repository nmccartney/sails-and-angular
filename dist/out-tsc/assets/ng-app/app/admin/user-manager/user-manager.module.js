var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var UserManagerModule = /** @class */ (function () {
    function UserManagerModule() {
    }
    UserManagerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MatTableModule,
                MatButtonModule,
                MatIconModule,
                MatDialogModule,
                MatSortModule,
                MatPaginatorModule,
                MatFormFieldModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                MatSnackBarModule,
            ],
            declarations: [UserManagerComponent, UserEditDialogComponent],
            exports: [
                UserManagerComponent
            ],
            entryComponents: [
                UserEditDialogComponent
            ]
        })
    ], UserManagerModule);
    return UserManagerModule;
}());
export { UserManagerModule };
//# sourceMappingURL=user-manager.module.js.map