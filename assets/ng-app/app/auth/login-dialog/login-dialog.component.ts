import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  returnUrl: string = 'user';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { returnUrl: string }) {
    this.returnUrl = data.returnUrl || this.returnUrl;
  }

  // TODO: setup in view
  onNoClick(): void {
    this.dialogRef.close({ returnUrl: this.returnUrl });
  }

  ngOnInit() {
  }

}
