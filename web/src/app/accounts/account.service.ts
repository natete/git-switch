import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from './account';
import { Http, Response } from '@angular/http';

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  /**
   * Get the list of connected accounts.
   * @returns {Observable<R>}.
   */
  getConnectedAccounts(): Observable<Account[]> {
    return this.http.get('/assets/json/accounts.json') //TODO use the proper endpoint
      // .map((res: Response) => {
      //   res.json()
      // })
      .catch((err: any) => Observable.throw(err));
  }

}
