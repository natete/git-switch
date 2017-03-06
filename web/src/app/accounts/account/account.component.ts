import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogsService } from '../../shared/dialogs/dialogs.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account;

  constructor(private accountService: AccountService,
              private dialogService: DialogsService) { }

  ngOnInit() {
  }

  /**
   * Remove an existing account.
   * @param account The account to disconnect.
   */
  removeAccount(account: Account): void {

    this.dialogService.confirm('Confirm Remove', 'Are you sure you want to disconnect this account?')
        .subscribe(() => this.accountService.removeAccount(account));

    // this.accountService.removeAccount(account)
    //     .subscribe(() => console.log('account removed'));
  }

}
