import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCurrentService {

  private _currentUser: any;
  get currentUser() { return this._currentUser; }
  set currentUser(value: any | null) {
    if(value===null){
      localStorage.removeItem('currentUser');
    }else{
      localStorage.setItem('currentUser', JSON.stringify(value));
    }
    this._currentUser = value;
    this.userChanges.next(this.currentUser);
  }

  userChanges = new Subject();


  constructor() {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
