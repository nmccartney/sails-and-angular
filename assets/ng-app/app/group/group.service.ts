import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  create(params) {
    return this.http.post<any>(`http://localhost:1337/group`, params)
      .pipe(map((resp: any) => {
        console.log('created group - ', resp);
        return resp;
      }));
  }

  delete(params) {
    let options: any = {
      body: params
    }
    return this.http.delete<any>(`http://localhost:1337/group/`, options)
      .pipe(map((resp: any) => {
        console.log('deleted group - ', resp);
        return resp;
      }));
  }

  edit(params) {
    console.log('API edit : ', params);
    return this.http.post<any>(`http://localhost:1337/group/${params.uid}`, params)
      .pipe(map((resp: any) => {
        console.log('edited group - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`http://localhost:1337/group`)
      .pipe(map((resp: any) => {
        // console.log('got groups - ', resp);
        return resp;
      }));
  }

  findOne(params: any) {
    let options = {
      body: params
    }
    return this.http
      .get(`http://localhost:1337/group/${params.uid}`)
      .pipe(map((resp: any) => {
        // console.log('got group - ', resp);
        return resp;
      }));
  }
}
