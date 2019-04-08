import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const url:string = 'http://localhost:1337';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  create(params) {
    return this.http.post<any>(`${url}/group`, params)
      .pipe(map((resp: any) => {
        console.log('created group - ', resp);
        return resp;
      }));
  }

  delete(params) {
    let options: any = {
      body: params
    }
    return this.http.delete<any>(`${url}/group/`, options)
      .pipe(map((resp: any) => {
        console.log('deleted group - ', resp);
        return resp;
      }));
  }

  edit(params) {
    return this.http.post<any>(`${url}/group/${params.uid}`, params)
      .pipe(map((resp: any) => {
        console.log('edited group - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`${url}/group`)
      .pipe(map((resp: any) => {
        // console.log('got groups - ', resp);
        return resp;
      }));
  }

  userGroups(params:any) {
    return this.http
      .get<any>(`${url}/user/${params.uid}/groups`)
      .pipe(map((resp: any) => {
        // console.log('got groups - ', resp);
        return resp;
      }));
  }

  getUsers(params:any) {
    return this.http
      .get<any>(`${url}/group/${params.uid}/users`)
      .pipe(map((resp: any) => {
        console.log('got group-users - ', resp);
        return resp;
      }));
  }

  findOne(params: any) {
    let options = {
      body: params
    }
    return this.http
      .get(`${url}/group/${params.uid}`)
      .pipe(map((resp: any) => {
        // console.log('got group - ', resp);
        return resp;
      }));
  }
}
