import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'ng-app/app/user/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  user;
  userForm;
  passwordForm;

  constructor(
    private bar: MatSnackBar,
    private us: UserService,
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.user = data;
  }

  ngOnInit() {
    this.userForm = this.createFormGroup();
    this.passwordForm = this.createPasswordFormGroup();
  }

  onSubmit() {
    let data;
    try {
      data = {
        ...this.user,
        ...this.userForm.value,
      }
    } catch (error) {
      this.bar.open(error, 'Error', { duration: 3000 });
    }

    console.log('submitting : ', data);
    this.us.edit(data).subscribe(
      data => {
        this.dialogRef.close(data);
        this.bar.open(`Event ${this.user.username} updated!`, 'Updated', { duration: 3000 });
      },
      error => {
        this.bar.open(error.message, 'Error', { duration: 3000 });
      });
  }

  private createFormGroup() {
    console.log('creating form model : ', this.user);
    return new FormGroup({
      username: new FormControl(this.user && this.user.username || ''),
      uid: new FormControl({
        value: this.user && this.user.uid || '',
        disabled: true
      }),
      firstName: new FormControl(this.user && this.user.first_name || ''),
      LastName: new FormControl(this.user && this.user.last_name || ''),
    });
  }

  private createPasswordFormGroup() {
    console.log('creating form password model : ', this.user);
    return new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required, this.passwordConfirming.bind(this)])
    });
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (!this.passwordForm) return;
    if (c.value !== this.passwordForm.get('password').value) {
      return { invalid: true };
    }
  }

}
