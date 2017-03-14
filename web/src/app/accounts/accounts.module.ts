import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AccountsListComponent, AccountComponent],
  providers: [AccountService]
})
export class AccountsModule { }
