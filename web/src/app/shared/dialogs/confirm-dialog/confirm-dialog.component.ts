import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

  }

}
