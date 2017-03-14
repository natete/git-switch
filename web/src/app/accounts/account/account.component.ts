import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { MdSnackBar } from '@angular/material';
import { DialogsService } from '../../shared/dialogs/dialogs.service';
import { SpinnerService } from '../../shared/providers/spinner.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account;

  constructor(private accountService: AccountService,
              private dialogService: DialogsService,
              private spinnerService: SpinnerService,
              private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  /**
   * Remove an existing account.
   * @param account The account to disconnect.
   */
  removeAccount(account: Account): void {

    this.dialogService.confirm('Confirm Remove', 'Are you sure you want to disconnect this account?')
        .filter(res => res)
        .do(() => this.spinnerService.showSpinner())
        .flatMap(() => this.accountService.removeAccount(account))
        .do(() => this.spinnerService.hideSpinner())
        .subscribe(() => this.snackBar.open('Account successfully removed', null, { duration: 2000 }));
  }

}
