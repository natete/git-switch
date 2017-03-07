import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { SpinnerService } from '../../shared/providers/spinner.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  private accounts: Account[];

  constructor(private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private spinnerService: SpinnerService,
              private snackBar: MdSnackBar) { }

  ngOnInit() {

    this.spinnerService.showSpinner();

    // Capture de URL parameters to check if we are coming back from
    // authorizing a new git account.
    this.activatedRoute.queryParams
        .filter((params: Params) => params['code'] && params['state'])
        .map((params: Params) => {
            return {code: params['code'], nonce: params['state']}
        })
        .flatMap((params) => (this.accountService.authorizeAccount(params.code, params.nonce)))
        .subscribe(() => this.snackBar.open('Account successfully added', null, {duration: 2000}));

    // Get the list of accounts
    this.accountService.getAccounts()
        .filter(accounts => !!accounts)
        .do(()=> this.spinnerService.hideSpinner())
        .subscribe(
          (accounts) => this.accounts = accounts,
          (error) => console.log(error)
        );
  }

  /**
   * Add a new account.
   */
  addAccount(): void {
    this.spinnerService.showSpinner();
    this.accountService.addAccount();
  }


}
