import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from './account';
import { InAppBrowser } from '@ionic-native/inappbrowser';
import { Constants } from '../../shared/constants';

@Injectable()
export class AccountsService {
  private readonly IN_APP_BROWSER_PARAMS = 'location=no,clearcache=yes';
  private readonly ACCOUNTS_URL = 'api/simple_git/account';
  private readonly FORMAT_URL = '?_format=json';

  private accountsStream = new BehaviorSubject<Account[]>([]);

  constructor(private http: Http) {}

  /**
   * Get the observable of the accounts the user has.
   * @returns {Observable<Account[]>} the observable of the accounts the user has.
   */
  getAccounts(): Observable<Account[]> {
    if (this.accountsStream.getValue()) {
      this.http
          .get(`${Constants.BACKEND_URL}/${this.ACCOUNTS_URL}/all${this.FORMAT_URL}`)
          .subscribe((accounts: any) => this.accountsStream.next(accounts as Account[]));
    }

    return this.accountsStream.asObservable();
  }

  /**
   * Adds a new github account redirecting the user to github login.
   */
  addAccount(): void {

    const redirectUri = `${window.location.protocol}//localhost:${window.location.port}/accounts${this.FORMAT_URL}`;

    const nonce = this.createNonce();

    const params: URLSearchParams = this.buildParams(redirectUri, nonce);

    const browserRef = new InAppBrowser(Constants.GITHUB_API_URL + params.toString(), '_blank', this.IN_APP_BROWSER_PARAMS);

    browserRef.on('loadstart')
              .filter(event => event.url.indexOf(redirectUri) === 0)
              .subscribe(event => this.handleOAuthCode(event, nonce, browserRef));
  }

  /**
   * Deletes an account and removes it from the stream of accounts.
   * @param accountId the id  of account to be deleted
   */
  deleteAccount(accountId: number): void {
    const url = `${Constants.BACKEND_URL}/${this.ACCOUNTS_URL}/${accountId}`;
    this.http
        .delete(url)
        .subscribe(() => this.accountsStream.next(
          this.accountsStream.getValue()
              .filter((ac: Account) => ac.id !== accountId))
        );
  }

  /**
   * Create a unique string to check if a request has
   * not been compromised.
   * @returns {string} The generated code.
   */
  private createNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 40; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  /**
   * Builds the required params to send a request to github to present its login page.
   * @param redirectUri the uri to be redirected after login success.
   * @param nonce a nonce to check the request hasn't been altered.
   * @returns {URLSearchParams} the object with the needed params.
   */
  private buildParams(redirectUri: string, nonce: string): URLSearchParams {
    const params = new URLSearchParams();

    params.set('client_id', 'cf0f72380b77a0ae16e9');
    params.set('redirect_uri', redirectUri);
    params.set('state', nonce);
    params.set('scope', 'user, repo');
    params.set('allow_signup', 'false');
    return params;
  }

  /**
   * Hand
   * @param event
   * @param nonce
   * @param browserRef
   */
  private handleOAuthCode(event, nonce: string, browserRef: InAppBrowser) {
    const urlParams = event.url.split('?')[1];
    const params: any = urlParams
      .split('&')
      .reduce((acc, param) => this.stringParamToObjectParam(acc, param), {});
    const url = `${Constants.BACKEND_URL}/${this.ACCOUNTS_URL}${this.FORMAT_URL}`;

    if (params.state === nonce) {
      this.http
          .post(url, JSON.stringify(params))
          .subscribe((account: any) => {
            const accounts: Account[] = this.accountsStream.getValue();
            accounts.push(account as Account);
            this.accountsStream.next(accounts);
          });
    }

    browserRef.close();
  }

  /**
   * Auxiliary method to reduce an array of querystring values to an object
   * @param accumulator the accumulator where the results are stored.
   * @param param the param to be processed.
   * @returns {Object} the result of the accumulator with the new data added.
   */
  private stringParamToObjectParam(accumulator, param: string) {
    const paramArray = param.split('=');
    accumulator[paramArray[0]] = paramArray[1];
    return accumulator;
  }
}
