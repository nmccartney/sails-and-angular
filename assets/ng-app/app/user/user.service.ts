import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findOne(uid: string) {
    return this.http
      .get(`http://localhost:1337/view`, { params: { uid: uid } })
      .pipe(map((resp: any) => {
        console.log('got user - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`http://localhost:1337/user`)
      .pipe(map((resp: any) => {
        console.log('got users - ', resp);
        return resp;
      }));
  }
}
