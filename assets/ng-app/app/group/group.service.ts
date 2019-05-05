import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'ng-app/environments/environment';

const URL:string = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  create(params) {
    return this.http.post<any>(`${URL}/group`, params)
      .pipe(map((resp: any) => {
        console.log('created group - ', resp);
        return resp;
      }));
  }

  delete(params) {
    let options: any = {
      body: params
    }
    return this.http.delete<any>(`${URL}/group/`, options)
      .pipe(map((resp: any) => {
        console.log('deleted group - ', resp);
        return resp;
      }));
  }

  edit(params) {
    return this.http.post<any>(`${URL}/group/${params.uid}`, params)
      .pipe(map((resp: any) => {
        console.log('edited group - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`${URL}/group`)
      .pipe(map((resp: any) => {
        // console.log('got groups - ', resp);
        return resp;
      }));
  }

  userGroups(params:any) {
    return this.http
      .get<any>(`${URL}/user/${params.uid}/groups`)
      .pipe(map((resp: any) => {
        // console.log('got groups - ', resp);
        return resp;
      }));
  }

  getUsers(params:any) {
    return this.http
      .get<any>(`${URL}/group/${params.uid}/users`)
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
      .get(`${URL}/group/${params.uid}`)
      .pipe(map((resp: any) => {
        // console.log('got group - ', resp);
        return resp;
      }));
  }
}
