import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [AccountsListComponent, AccountComponent],
  providers: [AccountService]
})
export class AccountsModule { }
