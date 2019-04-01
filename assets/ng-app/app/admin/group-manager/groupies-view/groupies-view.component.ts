import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groupies-view',
  templateUrl: './groupies-view.component.html',
  styleUrls: ['./groupies-view.component.scss']
})
export class GroupiesViewComponent implements OnInit {

  public latitude: number = 40.4406248;
  public longitude: number = -79.9958864;
  public zoom: number = 15;

  @Input() groupies;

  constructor() { }

  ngOnInit() {
  }

}
