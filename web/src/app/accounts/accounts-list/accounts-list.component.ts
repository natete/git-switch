import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  public accounts: Account[];

  constructor(private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MdSnackBar) { }

  ngOnInit() {

    // Capture de URL parameters to check if we are coming back from
    // authorizing a new git account.
    this.activatedRoute.queryParams
        .filter((params: Params) => params['code'] && params['state'])
        .map((params: Params) => {
            return {code: params['code'], nonce: params['state']}
        })
        .subscribe((params: {code: string, nonce: string}) => {
          this.accountService.authorizeAccount(params.code, params.nonce)
            .subscribe(() => this.snackBar.open('Account successfully added', null, {duration: 2000}));
        });

    // Get the list of accounts
    this.accountService.getAccounts()
        .subscribe(
          (accounts) => this.accounts = accounts,
          (error) => console.log(error)
        );
  }

  /**
   * Add a new account.
   */
  addAccount(): void {
    this.accountService.addAccount();
  }



}
