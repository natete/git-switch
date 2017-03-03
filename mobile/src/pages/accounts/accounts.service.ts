import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Account } from './account';

@Injectable()
export class AccountsService {
  private accountsUrl = 'api/accounts';
  private accountsStream = new BehaviorSubject<Account[]>([]);

  constructor(private http: Http) { }

  getAccounts(): Observable<Account[]> {
    if (this.accountsStream.getValue()) {
      this.http
          .get(this.accountsUrl)
          .map(response => response.json().data as Account[])
          .subscribe(accounts => {
            this.accountsStream.next(accounts);
          });
    }

    return this.accountsStream.asObservable();
  }

  deleteAccount(account: Account) {
    const url = `${this.accountsUrl}/${account.id}`;
    this.http
        .delete(url)
        .subscribe(() => this.accountsStream.next(
          this.accountsStream.getValue()
              .filter(ac => ac.id !== account.id))
        );
  }
}
