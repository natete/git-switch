import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Account } from './account';
import { InAppBrowser } from '@ionic-native/inappbrowser';

@Injectable()
export class AccountsService {
  private readonly IN_APP_BROWSER_PARAMS = 'location=no,clearcache=yes';
  private readonly GITHUB_BASE_URL = 'https://github.com/login/oauth/authorize?';
  private readonly ACCOUNTS_URL = 'api/accounts';

  private accountsStream = new BehaviorSubject<Account[]>([]);


  constructor(private http: Http) { }

  /**
   * Get the observable of the accounts the user has.
   * @returns {Observable<T>} the observable of the accounts the user has.
   */
  getAccounts(): Observable<Account[]> {
    if (this.accountsStream.getValue()) {
      this.http
          .get(this.ACCOUNTS_URL)
          .map(response => response.json().data as Account[])
          .subscribe(accounts => this.accountsStream.next(accounts));
    }

    return this.accountsStream.asObservable();
  }

  /**
   * Adds a new github account redirecting the user to github login.
   */
  addAccount(): void {

    const redirectUri = `${window.location.protocol}//localhost:${window.location.port}/accounts`;

    const nonce = this.createNonce();

    const params: URLSearchParams = this.buildParams(redirectUri, nonce);

    const browserRef = new InAppBrowser(this.GITHUB_BASE_URL + params.toString(), '_blank', this.IN_APP_BROWSER_PARAMS);

    browserRef.on('loadstart')
              .filter(event => event.url.indexOf(redirectUri) === 0)
              .subscribe(event => this.handleOAuthCode(event, nonce, browserRef));
  }

  /**
   * Deletes an account and removes it from the stream of accounts.
   * @param accountId the id  of account to be deleted
   */
  deleteAccount(accountId: number): void {
    const url = `${this.ACCOUNTS_URL}/${accountId}`;
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
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 40; i++) {
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

    if (params.state === nonce) {
      // TODO: send code and state to BE to get token
      console.warn(`TODO send code to BE to get auth token ${JSON.stringify(params)}`);
      this.accountsStream.next(this.accountsStream.getValue()
                                   .concat([
                                     {
                                       id: (new Date()).getTime(),
                                       type: 'github',
                                       name: 'ale',
                                       avatar: 'https://avatars1.githubusercontent.com/u/4848998?v=3&s=40',
                                       numOfRepos: 20
                                     }
                                   ]));
    }

    browserRef.close();
  }

  /**
   * Auxiliary method to reduce an array of querystring values to an object
   * @param accumulator the accumulator where the results are stored.
   * @param param the param to be processed.
   * @returns {any} the result of the accumulator with the new data added.
   */
  private stringParamToObjectParam(accumulator, param: string) {
    const paramArray = param.split('=');
    accumulator[paramArray[0]] = paramArray[1];
    return accumulator;
  }
}
