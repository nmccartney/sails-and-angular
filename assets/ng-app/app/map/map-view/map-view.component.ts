import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  public zoom: number = 15;

  friendListOpened:boolean = false;

  constructor(private _cd:ChangeDetectorRef) { }

  ngOnInit() {
  }

  map;
  onMapReady(event){
    console.log('onMapReady:', event);
    this.map = event;
  }

  onBoundsChange(event){
    // console.log('onBoundsChange:', event);
    // this._cd.markForCheck();
  }

  currLng = this.longitude;;
  currLat = this.latitude;
  currZoom = this.zoom;

  onCenterChange(event){
    // console.log('onCenterChange:', event);
    this.currLng = event.lng;
    this.currLat = event.lat;
    this._cd.markForCheck();
  }

  onZoomChange(event){
    // console.log('onZoomChange:', event);
    this.currZoom = event;
    this._cd.markForCheck();
  }

  @ViewChild(AgmMap) mapElem:AgmMap;

  findMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log("Geolocation :", { long: longitude, lati: latitude })
        this.longitude = longitude;
        this.latitude = latitude;
        this.zoom = 20;
        // this.mapElem.longitude = longitude;
        // this.mapElem.latitude = latitude;
        console.log(this.map);
        console.log(this.mapElem);

        this._cd.markForCheck();
        this._cd.detectChanges();

      });
    } else {
      console.log("No support for geolocation")
    }
  }

}
