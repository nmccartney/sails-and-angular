import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../event.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  groupForm: FormGroup;
  event: any = { name: 'my event' };

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private bar: MatSnackBar,
    private es: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm = this.createFormGroup();

  }

  ngOnInit() {
    this.es.findOne(this.data)
      .pipe(first())
      .subscribe(data => {
        this.event = data;
        this.groupForm.controls.name.setValue(this.event.name);

        const ownerName = this.event.owner && this.event.owner.username || 'N/A'
        this.groupForm.controls.owner.setValue(ownerName);
      }, error => {
        this.bar
          .open(error.message, 'error', { duration: 3000 });
      });
  }

  onSubmit() {
    let data = {
      ...this.event,
      ...this.groupForm.value,
    }
    console.log(data);
    this.es.edit(data).subscribe(
      data => {
        this.dialogRef.close(data);
        this.bar.open(`Event ${this.event.name} updated!`, 'Updated', { duration: 3000 });
      },
      error => {
        this.bar.open(error.message, 'Error', { duration: 3000 });
      });
  }

  private createFormGroup() {
    return new FormGroup({
      name: new FormControl(this.event.name),
      owner: new FormControl({
        value: 'n/a',
        disabled: true
      })
    });
  }

}
