import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { GroupService } from '../../group.service';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'ng-app/app/user/user.service';
import { GroupService } from 'ng-app/app/group/group.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  groupForm: FormGroup;
  owner:any;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private gs: GroupService,
    private us:UserService) {
    this.groupForm = this.createFormGroup();
    let user = this.us.findMe() || '';
    this.owner = JSON.parse(user);
  }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(),
      owner: new FormControl(),
    });
  }

  submit() {
    console.log('creating group ', this.groupForm);
    let data = {
      owner: this.owner,
      ...this.groupForm.value
    }
    this.gs.create(data).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      error => {
        console.log('create group failed : ', error);
      });
  }
}
