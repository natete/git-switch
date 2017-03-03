import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  public accounts: Account[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getConnectedAccounts()
      .subscribe(
        (accounts) => this.accounts = accounts,
        (error) => console.log(error)
      )
  }

}
