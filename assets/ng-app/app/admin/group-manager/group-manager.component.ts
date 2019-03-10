import { Component, OnInit } from '@angular/core';
// import { GroupService } from '../group.service';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { GroupService } from 'ng-app/app/group/group.service';

@Component({
  selector: 'group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  groupDefs = ['id', 'name', 'createdAt', 'actions'];
  groups: any;

  constructor(private gs: GroupService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.setGroups();
  }

  setGroups() {
    this.gs.find()
      .subscribe(
        data => {
          this.groups = data;
        },
        error => {
          console.log('viewing group failed : ', error);
        });
  }

  create(): void {
    const createDialogRef = this.dialog.open(CreateDialogComponent, {
      height: '350px',
      data: {}
    });

    createDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.setGroups();
    });
  }

  onEdit(group): void {
    const editDialogRef = this.dialog.open(EditDialogComponent, {
      height: '80%',
      width:'80%',
      data: group
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.setGroups();
    });
  }

  onDelete(params): void {
    const data = {
      uid: params.uid
    }

    console.log(params, data);
    this.gs.delete(data).subscribe(
      data => {
        this.setGroups();
      }, err => {
        console.log('group delete failed!');
      });
  }

}
