import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { SelectDialog } from './select-dialog/select-dialog.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public select(title: string, message: string, option1?: string, option2?: string): Observable<string> {

    let dialogRef: MdDialogRef<SelectDialog>;

    dialogRef = this.dialog.open(SelectDialog);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.option1 = option1 || null;
    dialogRef.componentInstance.option2 = option2 || null;

    return dialogRef.afterClosed();

  }

}
