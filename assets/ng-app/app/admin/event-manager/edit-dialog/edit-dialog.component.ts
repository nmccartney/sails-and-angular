/// <reference types="@types/googlemaps" />
// import { } from 'googlemaps';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
// import { EventService } from '../../event.service';
import { first } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { MAT_DATETIME_FORMATS, MatDatetimepicker } from '@mat-datetimepicker/core';
import { MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { EventService } from 'ng-app/app/event/event.service';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DDTh:mm',
  },
  display: {
    dateInput: 'YYYY-MM-DDTh:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDatetimeAdapter,
  //     deps: [MAT_DATE_LOCALE]
  //   },
  //   {
  //     provide: MAT_DATETIME_FORMATS,
  //     useValue: MAT_MOMENT_DATETIME_FORMATS
  //   }
  // ],
})
export class EditDialogComponent implements OnInit {

  groupForm: FormGroup;
  event: any = { name: 'my event' };

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  public placeId;
  public searchControl: FormControl;
  public zoom: number = 15;
  @ViewChild(MatDatetimepicker) datetimePicker: MatDatetimepicker<any>;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private bar: MatSnackBar,
    private es: EventService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //
    this.groupForm = this.createFormGroup();
  }

  ngOnInit() {

    console.log(this.datetimePicker);

    this.es.findOne(this.data)
      .pipe(first())
      .subscribe(data => {
        this.event = data;

        this.groupForm = this.createFormGroup();

        const ownerName = this.event.owner && this.event.owner.username || 'N/A'
        this.groupForm.controls.owner.setValue(ownerName);


      }, error => {
        this.bar
          .open(error.message, 'error', { duration: 3000 });
      });

    //
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete: any = new google.maps.places
        .Autocomplete(this.searchElementRef.nativeElement, {
          types: [
            // 'address',
            // 'establishment'
          ],
          fields: [
            'geometry.location', // may cost $$
            'place_id', // free
          ]
        });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            console.error(place);
            this.bar.open('Map location error', 'Error', { duration: 3000 });
            return;
          }

          console.log(place, this.searchElementRef.nativeElement.value);


          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.event.place_id = place.place_id;
          this.event.gps = { lat: this.latitude, lng: this.longitude };
          this.zoom = 18;
          const placeValue: string = this.searchElementRef.nativeElement.value;
          this.groupForm.controls.location.setValue(placeValue);
        });
      });
    });
  }

  onSubmit() {
    let data = {
      ...this.event,
      ...this.groupForm.value,
    }
    console.log(data);
    this.es.edit(data).subscribe(
      data => {
        this.dialogRef.close(data);
        this.bar.open(`Event ${this.event.name} updated!`, 'Updated', { duration: 3000 });
      },
      error => {
        this.bar.open(error.message, 'Error', { duration: 3000 });
      });
  }

  private createFormGroup() {
    console.log('creating form model : ', this.event);
    return new FormGroup({
      name: new FormControl(this.event.name),
      description: new FormControl(this.event.description || ''),
      start_time: new FormControl(this.event.start_time || moment()),
      // end_time: new FormControl(this.event.end_time || moment()),
      end_time: new FormControl(''),
      owner: new FormControl({
        value: 'n/a',
        disabled: true
      }),
      location: new FormControl(this.event.location || '')
    });
  }

}
