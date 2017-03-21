import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialog {

  public title: string;
  public message: string;
  public option1: string;
  public option2: string;

  constructor(public dialogRef: MdDialogRef<SelectDialog>) {
  }

}
