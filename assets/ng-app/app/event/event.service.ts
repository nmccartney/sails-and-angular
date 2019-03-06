import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  create(params) {
    return this.http.post<any>(`http://localhost:1337/event`, params)
      .pipe(map((resp: any) => {
        console.log('created event - ', resp);
        return resp;
      }));
  }

  delete(params) {
    let options: any = {
      body: params
    }
    return this.http.delete<any>(`http://localhost:1337/event/`, options)
      .pipe(map((resp: any) => {
        console.log('deleted event - ', resp);
        return resp;
      }));
  }

  edit(params) {
    return this.http.post<any>(`http://localhost:1337/event/${params.uid}`, params)
      .pipe(map((resp: any) => {
        console.log('edited event - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`http://localhost:1337/event`)
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
      .get(`http://localhost:1337/event/${params.uid}`)
      .pipe(map((resp: any) => {
        // console.log('got event - ', resp);
        return resp;
      }));
  }

}
