import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewComponent } from './admin-view.component';
import {
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';
import { UserManagerComponent } from '../user-manager/user-manager.component';
import { GroupManagerComponent } from '../group-manager/group-manager.component';
import { EventManagerComponent } from '../event-manager/event-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AdminViewComponent,
        UserManagerComponent,
        GroupManagerComponent,
        EventManagerComponent,
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
