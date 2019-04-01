var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { MatTableModule, MatToolbarModule, MatCardModule, MatTabsModule, MatButtonModule, } from '@angular/material';
import { EventManagerModule } from './event-manager/event-manager.module';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { GroupManagerModule } from './group-manager/group-manager.module';
import { UserManagerModule } from './user-manager/user-manager.module';
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        NgModule({
            imports: [
                AgmCoreModule,
                CommonModule,
                EventManagerModule,
                GroupManagerModule,
                MatButtonModule,
                MatTabsModule,
                MatCardModule,
                MatToolbarModule,
                MatTableModule,
                ReactiveFormsModule,
                FormsModule,
                // MatMomentDatetimeModule,
                MatDatetimepickerModule,
                FlatpickrModule.forRoot(),
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: adapterFactory
                }),
                RouterModule.forRoot(adminRoutes),
                UserManagerModule,
            ],
            exports: [],
            declarations: [
                AdminViewComponent,
            ],
        })
    ], AdminModule);
    return AdminModule;
}());
export { AdminModule };
//# sourceMappingURL=admin.module.js.map