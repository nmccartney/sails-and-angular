import { Component, OnInit, ViewChild } from '@angular/core';
// import { EventService } from '../event.service';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource, MAT_DATE_LOCALE } from '@angular/material';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EventService } from 'ng-app/app/event/event.service';
import { MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { DateAdapter } from 'angular-calendar';

@Component({
  selector: 'event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDatetimeAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: MAT_MOMENT_DATETIME_FORMATS
    }
  ],
})
export class EventManagerComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  eventDefs = ['id', 'name', 'time','location','createdAt', 'actions'];
  events: any;

  constructor(
    private es: EventService,
    public dialog: MatDialog,
    private bar:MatSnackBar) {
  }

  ngOnInit() {
    this.setEvents();
  }

  setEvents() {
    this.es.find()
      .subscribe(
        data => {
          this.events = new MatTableDataSource(data);
          this.events.sort = this.sort;
          this.bar.open('got events','success',{duration:3000});
        },
        error => {
          console.log('viewing edit failed : ', error);
          this.bar.open(error.message,'error',{duration:3000});
        });
  }

  create(): void {
    const createDialogRef = this.dialog.open(CreateDialogComponent, {
      height: '350px',
      data: {}
    });

    createDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.setEvents();
    });
  }

  onEdit(event): void {
    const editDialogRef = this.dialog.open(EditDialogComponent, {
      height: '80%',
      width:'80%',
      data: event
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.setEvents();
    });
  }

  onDelete(params): void {
    const data = {
      uid: params.uid
    }

    console.log(params, data);
    this.es.delete(data).subscribe(
      data => {
        this.setEvents();
      }, err => {
        console.log('edit delete failed!');
      });
  }
}
