import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { DialogsModule } from './dialogs/dialogs.module';
import { SpinnerService } from './providers/spinner.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    DialogsModule,
    FlexLayoutModule,
    HeaderComponent,
    MaterialModule,
    NavMenuComponent,
    BackToTopComponent
  ],
  declarations: [HeaderComponent, NavMenuComponent, BackToTopComponent],
  providers: [SpinnerService]
})
export class SharedModule { }
