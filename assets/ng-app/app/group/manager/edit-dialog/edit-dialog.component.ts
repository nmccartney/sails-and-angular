import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { GroupService } from '../../group.service';
import { UserService } from 'ng-app/app/user/user.service';
import { first, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  groupForm: FormGroup;
  group: any;
  users: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  allUsers: any = [];
  @ViewChild('userInput') userInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private gs: GroupService,
    private us: UserService,
    private bar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm = this.createFormGroup();

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
    this.gs.findOne(this.data)
      .pipe(first())
      .subscribe(
        data => {
          // console.log('get group success : ', data);
          this.group = data;
          this.users = data.users;
          this.groupForm.controls.name.setValue(this.group.name);
          this.groupForm.controls.owner.setValue(this.group.owner);
          this.groupForm.controls.users.setValue(this.group.users);
        },
        error => {
          this.bar.open(error.message,'error',{duration:3000});
        });

    this.us.find()
      .subscribe(
        data => {
          this.allUsers = data;
        },
        error => {
          this.bar.open(error.message,'error',{duration:3000});
        });
  }

  onSubmit() {
    let data = {
      ...this.group,
      ...this.groupForm.value,
    }
    console.log(data);
    this.gs.edit(data).subscribe(
      data => {
        this.dialogRef.close(data);
        this.bar.open(`Group ${this.group.name} updated!`,'Updated',{duration:3000});
      },
      error => {
        this.bar.open(error.message,'Error',{duration:3000});
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // TODO - this condition adds input value which may not equate to a user
    // Add our user
    // if ((value || '').trim()) {
    // this.users.push(value.trim());
    // }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(user: any): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
    this.groupForm.controls.users.setValue(this.users);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.groupForm.controls.users.setValue(this.users);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter((user) => {
      return user.username.toLowerCase().indexOf(filterValue) === 0
    });
  }

  private createFormGroup() {
    return new FormGroup({
      name: new FormControl(),
      owner: new FormControl(),
      users: new FormControl()
    });
  }

}
