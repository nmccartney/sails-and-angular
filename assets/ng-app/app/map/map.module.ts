import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MapToolbarComponent } from './map-toolbar/map-toolbar.component';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { PlaceListComponent } from './place-list/place-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { mapRoutes } from './map.routes';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule.forRoot(mapRoutes),
    // UserModule,
  ],
  exports:[
    MapViewComponent
  ],
  declarations: [MapViewComponent, MapToolbarComponent, PlaceListComponent, UserListComponent]
})
export class MapModule { }
