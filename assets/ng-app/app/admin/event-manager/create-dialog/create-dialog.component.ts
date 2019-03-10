import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
// import { EventService } from '../../event.service';
import { UserService } from 'ng-app/app/user/user.service';
import { EventService } from 'ng-app/app/event/event.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  eventForm: FormGroup;
  owner: any;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private es: EventService,
    private us: UserService) {
    let user = this.us.findMe() || '';
    this.owner = JSON.parse(user);
    this.eventForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(),
      owner: new FormControl({
        value: this.owner.uid,
        disabled: true
      }),
    });
  }

  submit() {
    let data = {
      owner: this.owner,
      ...this.eventForm.value
    }

    console.log('creating event ', data);

    this.es.create(data).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      error => {
        console.log('create event failed : ', error);
      });
  }

}
