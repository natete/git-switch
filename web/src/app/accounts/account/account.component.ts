import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  /**
   * Remove an existing account.
   * @param account The account to disconnect.
   */
  removeAccount(account: Account): void {
    this.accountService.removeAccount(account)
        .subscribe(() => console.log('account removed'));
  }

}
