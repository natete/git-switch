import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { DialogsService } from './dialogs.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialog],
  providers: [DialogsService],
  entryComponents: [ConfirmDialog]
})
export class DialogsModule { }
