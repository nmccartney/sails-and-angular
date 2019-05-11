import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'ng-app/app/user/user.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  users;
  userDefs = ['id', 'username', 'uid', 'createdAt', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private us: UserService,
    private dialog: MatDialog,
    private bar: MatSnackBar) {
  }

  ngOnInit() {
    this.setUsers();
  }

  setUsers() {
    this.us.find()
      .subscribe(
        data => {
          this.users = new MatTableDataSource(data);
          this.users.sort = this.sort;
          this.users.paginator = this.paginator;
          console.log('users find', data);
          this.bar.open('got users', 'success', { duration: 3000 });
        },
        error => {
          console.log('viewing edit failed : ', error);
          this.bar.open(error.message, 'error', { duration: 3000 });
        });
  }

  onEdit(user): void {
    const editDialogRef = this.dialog.open(UserEditDialogComponent, {
      height: '80%',
      width: '80%',
      data: user
    });

    editDialogRef.afterClosed().subscribe(result => {
      this.bar.open('User updated', 'success', { duration: 3000 });

      this.setUsers();
    });
  }

  onDelete(params): void {
    const data = {
      uid: params.uid
    }

    //   console.log(params, data);
    this.us.delete(data).subscribe(
      data => {
        this.setUsers();
        this.bar.open('User deleted', 'info', { duration: 3000 });
      }, err => {
        console.log('user delete failed!');
      });
  }

}
