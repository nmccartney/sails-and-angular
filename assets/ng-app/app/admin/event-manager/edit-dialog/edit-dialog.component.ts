/// <reference types="@types/googlemaps" />
// import { } from 'googlemaps';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatAutocompleteSelectedEvent } from '@angular/material';
// import { EventService } from '../../event.service';
import { first } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { MAT_DATETIME_FORMATS, MatDatetimepicker } from '@mat-datetimepicker/core';
import { MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { EventService } from 'ng-app/app/event/event.service';
import { GroupService } from 'ng-app/app/group/group.service';

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
  groups;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  public placeId;
  public searchControl: FormControl;
  public zoom: number = 15;
  @ViewChild(MatDatetimepicker) datetimePicker: MatDatetimepicker<any>;
  private group;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private bar: MatSnackBar,
    private es: EventService,
    private gs: GroupService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //
    this.groupForm = this.createFormGroup();
  }

  ngOnInit() {

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

    this.gs.find()
      .subscribe(data => {
        this.groups = data;
        console.log('groups ', data);
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

  onGroupSelected(event: MatAutocompleteSelectedEvent): void {
    this.group = event.option.value;
    this.groupForm.controls.group.setValue(event.option.value.name);
  }

  onSubmit() {
    let data;
    try {
      data = {
        ...this.event,
        ...this.groupForm.value,
        group: this.group && this.group.id || this.event.group.id
      }
    }catch(error){
      this.bar.open(error, 'Error', { duration: 3000 });
    }

    console.log('submitting : ',data);
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
      group: new FormControl(this.event.group && this.event.group.name || ''),
      description: new FormControl(this.event.description || ''),
      start_time: new FormControl(this.event.start_time || moment()),
      end_time: new FormControl(this.event.end_time || moment()),
      owner: new FormControl({
        value: 'n/a',
        disabled: true
      }),
      location: new FormControl(this.event.location || '')
    });
  }

}
