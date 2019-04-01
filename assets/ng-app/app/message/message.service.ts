import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export type Message = {
  content: string,
  type: string,
  uid: string,
  group: string,
  author: string
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  create(params: any) {
    return this.http.post<any>(`http://localhost:1337/group/${params.group}/message`, params)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  delete(params) {
    return this.http.delete<any>(`http://localhost:1337/message/`, params)
      .pipe(map((resp: any) => {
        console.log('deleted message - ', resp);
        return resp;
      }));
  }

  find(params: { groupId: string }) {
    return this.http.get<any>(`http://localhost:1337/group/${params.groupId}/messages`)
      .pipe(map((resp: any) => {
        // console.log('got message - ', resp);
        return resp;
      }));
  }
}

