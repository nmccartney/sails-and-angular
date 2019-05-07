import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  returnUrl: string = 'user';
  @ViewChild(MatTabGroup) tabGroup:MatTabGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { returnUrl: string }) {
    this.returnUrl = data.returnUrl || this.returnUrl;
  }

  ngOnInit() {
  }

  onLogin(){
    this.dialogRef.close({ returnUrl: this.returnUrl });
  }

  onRegister(){
    console.log('got register success. move tab to login');
    this.tabGroup.selectedIndex = 0;
  }

  // TODO: setup in view
  onNoClick(): void {
    this.dialogRef.close({ returnUrl: this.returnUrl });
  }



}
