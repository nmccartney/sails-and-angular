import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { UserCurrentService } from 'ng-app/app/user/user-current.service';
import { GroupService } from '../group.service';
import { UserService } from 'ng-app/app/user/user.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.scss']
})
export class GroupNewComponent implements OnInit {
  groupForm: FormGroup;
  group:any = {};
  currUser;
  users: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allUsers: any = [];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;

  @ViewChild('userInput') userInput: ElementRef;

  constructor(
    private gs: GroupService,
    private bar:MatSnackBar,
    private router: Router,
    private us: UserService,
    private currUserService:UserCurrentService,
  ) {

    this.filteredUsers = this.userCtrl.valueChanges
      .pipe(
        startWith(null),
        map((user: any | null) => {
          if (typeof user !== 'string') {
            return user ? this._filter(user.username) : this.allUsers.slice();
          } else {
            return user ? this._filter(user) : this.allUsers.slice();
          }
        }));
  }

  ngOnInit() {
    this.us.find()
      .subscribe(
        data => {
          this.allUsers = data;
        },
        error => {
          this.bar.open(error.message,'error',{duration:3000});
        });

    this.currUser = this.currUserService.currentUser;
    this.groupForm = this.createFormGroup();

    console.log(this.currUser,this.groupForm.value);
  }

  onSubmit() {
    let data = {
      ...this.group,
      ...this.groupForm.value,
    }
    console.log(data);

    if(!data.owner){
      this.bar.open('Owner id required','Error',{duration:3000});
      return;
    }

    this.gs.create(data).subscribe(
      data => {
        this.router.navigate(['/group', data.uid]);
        this.bar.open(`Group ${data.name} created!`,'Created',{duration:3000});
      },
      error => {
        this.bar.open(error.message,'Error',{duration:3000});
      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.groupForm.controls.users.setValue(this.users);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  remove(user: any): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
    this.groupForm.controls.users.setValue(this.users);
  }

  private createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      owner: new FormControl(this.currUser.id),
      users: new FormControl()
    });
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter((user) => {
      return user.username.toLowerCase().indexOf(filterValue) === 0
    });
  }

}
