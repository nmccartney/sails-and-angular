var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { GroupManagerComponent } from './group-manager.component';
import { MatFormFieldModule, MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule, MatTabsModule, MatListModule } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventManagerModule } from '../event-manager/event-manager.module';
import { GroupiesViewComponent } from './groupies-view/groupies-view.component';
import { AgmCoreModule } from '@agm/core';
import { EditChatComponent } from './edit-dialog/edit-chat/edit-chat.component';
var GroupManagerModule = /** @class */ (function () {
    function GroupManagerModule() {
    }
    GroupManagerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                EventManagerModule,
                FlexLayoutModule,
                MatButtonModule,
                MatFormFieldModule,
                MatListModule,
                MatToolbarModule,
                MatTableModule,
                MatTabsModule,
                MatInputModule,
                MatDialogModule,
                MatChipsModule,
                MatIconModule,
                MatAutocompleteModule,
                MatSnackBarModule,
                ReactiveFormsModule,
                AgmCoreModule,
            ],
            exports: [
                GroupManagerComponent
            ],
            declarations: [
                GroupManagerComponent,
                CreateDialogComponent,
                EditDialogComponent,
                GroupiesViewComponent,
                EditChatComponent
            ],
            entryComponents: [
                CreateDialogComponent,
                EditDialogComponent
            ]
        })
    ], GroupManagerModule);
    return GroupManagerModule;
}());
export { GroupManagerModule };
//# sourceMappingURL=group-manager.module.js.map