var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventViewComponent } from './event-view/event-view.component';
import { MatButtonModule, MatTableModule, MatCardModule, MatDialogModule, MatToolbarModule, MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatChipsModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatDatetimepickerModule, } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
var EventModule = /** @class */ (function () {
    function EventModule() {
    }
    EventModule = __decorate([
        NgModule({
            imports: [
                AgmCoreModule,
                CommonModule,
                FlexLayoutModule,
                MatButtonModule,
                MatFormFieldModule,
                MatAutocompleteModule,
                MatDatepickerModule,
                MatChipsModule,
                MatSortModule,
                MatTableModule,
                MatInputModule,
                MatIconModule,
                MatCardModule,
                MatDialogModule,
                MatToolbarModule,
                MatSnackBarModule,
                ReactiveFormsModule,
                FormsModule,
                MatMomentDatetimeModule,
                MatDatetimepickerModule,
                FlatpickrModule.forRoot(),
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: adapterFactory
                })
            ],
            exports: [
                EventViewComponent
            ],
            declarations: [
                EventViewComponent,
                EventCalendarComponent,
            ],
            entryComponents: [
                EventCalendarComponent,
            ],
        })
    ], EventModule);
    return EventModule;
}());
export { EventModule };
//# sourceMappingURL=event.module.js.map