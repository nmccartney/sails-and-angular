var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatFormFieldModule, MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule, MatDatepickerModule, MatSortModule, DateAdapter, MatButtonToggleModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventCalendarComponent } from './edit-dialog/event-calendar/event-calendar.component';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { EventManagerComponent } from './event-manager.component';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
var EventManagerModule = /** @class */ (function () {
    function EventManagerModule() {
    }
    EventManagerModule = __decorate([
        NgModule({
            imports: [
                AgmCoreModule,
                CommonModule,
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: MomentDatetimeAdapter
                }),
                FlexLayoutModule,
                MatButtonModule,
                MatButtonToggleModule,
                MatFormFieldModule,
                MatToolbarModule,
                MatTableModule,
                MatInputModule,
                MatIconModule,
                MatDialogModule,
                MatChipsModule,
                MatIconModule,
                MatSortModule,
                MatDatetimepickerModule,
                MatDatepickerModule,
                MatAutocompleteModule,
                MatSnackBarModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [
                CreateDialogComponent,
                EditDialogComponent,
                EventCalendarComponent,
                EventManagerComponent
            ],
            exports: [
                EventCalendarComponent,
                EventManagerComponent,
                CreateDialogComponent,
            ],
            entryComponents: [
                EditDialogComponent,
                CreateDialogComponent
            ],
        })
    ], EventManagerModule);
    return EventManagerModule;
}());
export { EventManagerModule };
//# sourceMappingURL=event-manager.module.js.map