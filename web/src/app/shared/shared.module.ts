import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { DialogsModule } from './dialogs/dialogs.module';
import { SpinnerService } from './providers/spinner.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    DialogsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [],
  providers: [SpinnerService]
})
export class SharedModule { }
