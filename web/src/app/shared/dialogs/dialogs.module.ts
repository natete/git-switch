import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { SelectDialog } from './select-dialog/select-dialog.component';
import { DialogsService } from './dialogs.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialog, SelectDialog],
  providers: [DialogsService],
  entryComponents: [ConfirmDialog, SelectDialog]
})
export class DialogsModule { }
