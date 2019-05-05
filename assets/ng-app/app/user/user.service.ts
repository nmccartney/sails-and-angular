import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'ng-app/environments/environment';

const URL:string = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  edit(user){
    return this.http
      .post(`${URL}/edit`, { params: { uid: user.uid } })
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  findMe(){
    const user = localStorage.getItem('currentUser');
    if(!user)return false;
    return user;
  }

  findOne(uid: string) {
    return this.http
      .get(`${URL}/view`, { params: { uid: uid } })
      .pipe(map((resp: any) => {
        // console.log('got user - ', resp);
        return resp;
      }));
  }

  find() {
    return this.http.get<any>(`${URL}/user`)
      .pipe(map((resp: any) => {
        // console.log('got users - ', resp);
        return resp;
      }));
  }
}
