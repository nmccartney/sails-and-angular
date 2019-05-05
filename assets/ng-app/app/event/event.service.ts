import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'ng-app/environments/environment';

const URL:string = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  create(params) {
    return this.http.post<any>(`${URL}/event`, params)
      .pipe(map((resp: any) => {
        console.log('created event - ', resp);
        return resp;
      }));
  }

  delete(params) {
    let options: any = {
      body: params
    }
    return this.http.delete<any>(`${URL}/event/`, options)
      .pipe(map((resp: any) => {
        console.log('deleted event - ', resp);
        return resp;
      }));
  }

  edit(params) {
    return this.http.post<any>(`${URL}/event/${params.uid}`, params)
      .pipe(map((resp: any) => {
        console.log('edited event - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`${URL}/event`)
      .pipe(map((resp: any) => {
        // console.log('got events - ', resp);
        return resp;
      }));
  }

  findOne(params: any) {
    let options = {
      body: params
    }
    return this.http
      .get(`${URL}/event/${params.uid}`)
      .pipe(map((resp: any) => {
        // console.log('got event - ', resp);
        return resp;
      }));
  }

}
