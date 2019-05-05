import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

import { Component, OnInit, NgZone, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
// import { EventService } from '../../event.service';
import { UserService } from 'ng-app/app/user/user.service';
import { EventService } from 'ng-app/app/event/event.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  eventForm: FormGroup;
  owner: any;
  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  private event = {};
  @ViewChild("search")
  public searchElementRef: ElementRef;
  groups;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private es: EventService,
    private bar: MatSnackBar,
    private us: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    let user = this.us.findMe() || '';
    this.owner = JSON.parse(user);
    console.log(dialogRef);
    this.eventForm = this.createFormGroup();
  }

  ngOnInit() {
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
          this.event['place_id'] = place.place_id;
          this.event['gps'] = { lat: this.latitude, lng: this.longitude };
          const placeValue: string = this.searchElementRef.nativeElement.value;
          this.eventForm.controls.location.setValue(placeValue);
        });
      });
    });
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(),
      owner: new FormControl({
        value: this.owner.username,
        disabled: true
      }),
      group: new FormControl(this.data && this.data.group && this.data.group.name || ''),
      description: new FormControl(''),
      start_time: new FormControl(moment()),
      end_time: new FormControl( moment().add(1,'hours')),
      location: new FormControl('')
    });
  }

  onGroupSelected(event:any){
    console.log(event);
  }

  submit() {
    let data = {
      ...this.event,
      ...this.eventForm.value,
      owner: this.owner & this.owner.id || null,
      group:this.data && this.data.group && this.data.group.id || null
    }

    console.log('creating event ', data);

    this.es.create(data).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      error => {
        // console.log('create event failed : ', error);
        this.bar.open(error.message, 'Error', { duration: 3000 });
      });
  }

}
