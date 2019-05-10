import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ICustomWindow, WindowRefService } from 'ng-app/app/window-ref.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'app-map-view',
  }
})
export class MapViewComponent implements OnInit {

  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  public zoom: number = 15;
  mapSize:{height:number | string,width:number | string} = {
    height:'100px',
    width:'100px'
  };
  private _users;
  private _groupUID;
  group: any = {
    uid: '5f34566f-b18d-39a4-a96a-1d9db6dc8582'
  };


  friendListOpened: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.mapSize.width = event.target.innerWidth;
    this.mapSize.height = event.target.innerHeight - 113;
    console.log('s: ', this.mapSize);
  }

  private _window: ICustomWindow;

  constructor(
    private _windowRef: WindowRefService,
    private _cd: ChangeDetectorRef,
    private _route: ActivatedRoute) {
    this._window = _windowRef.nativeWindow;
  }

  ngOnInit() {

    this._route.parent.params.subscribe((params) => {
      // this._groupUID = +params.get('group_uid');
      this.group['uid'] = params['uid'];
      console.log('map view params', params);
      this._cd.markForCheck();
    });

    this.mapSize.width = this._window.innerWidth;
    this.mapSize.height = this._window.innerHeight - 113;
    console.log('s: ', this.mapSize);

  }

  map;
  onMapReady(event) {
    console.log('onMapReady:', event);
    this.map = event;
  }

  onBoundsChange(event) {
    // console.log('onBoundsChange:', event);
    // this._cd.markForCheck();
  }

  currLng = this.longitude;;
  currLat = this.latitude;
  currZoom = this.zoom;

  onCenterChange(event) {
    // console.log('onCenterChange:', event);
    this.currLng = event.lng;
    this.currLat = event.lat;
    this._cd.markForCheck();
  }

  onZoomChange(event) {
    // console.log('onZoomChange:', event);
    this.currZoom = event;
    this._cd.markForCheck();
  }

  @ViewChild(AgmMap) mapElem: AgmMap;

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
