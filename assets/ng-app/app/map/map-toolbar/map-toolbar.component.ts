import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent implements OnInit {

  menuOpen:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.menuOpen = !this.menuOpen;
  }

}
