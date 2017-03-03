import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';
import { Http, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class AccountService {

  private storage: Storage = localStorage;

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

  /**
   * Initiate the process for getting a git login code.
   */
  addAccount(): void {
    var nonce = this.createNonce();
    this.storage.setItem('GitNonce', nonce);

    this.http.get('/assets/json/github-client.json')
      .subscribe(
        (gitHubClient: any) => {
          let params = new URLSearchParams();

          params.set('client_id', gitHubClient.client_id);
          params.set('redirect_uri', `${window.location.protocol}//${window.location.hostname}:${window.location.port}/accounts`);
          params.set('state', nonce);
          params.set('scope', 'user, repo');
          params.set('allow_signup', 'false');


          location.href = 'https://github.com/login/oauth/authorize?' + params.toString();
        }
      )
  }

  /**
   * Disconnect an account.
   * @param account The account to disconnect.
   * @returns {Observable<Response>}.
   */
  removeAccount(account: Account) {
    let params = new URLSearchParams();
    params.set('accountId', account.id.toString());
    return this.http.post('', params); // TODO
  }

  /**
   * Authorize the user account.
   * @param code The code to send to the BE so that it can obtain the access token.
   * @param nonce The nonce to check if the petition has been compromised.
   * @return TODO
   */
  authorizeAccount(code: string, nonce: string) {
    if (this.storage.getItem('GitNonce') === nonce) {
      let params = new URLSearchParams();
      params.set('code', code);
      params.set('nonce', nonce);

      this.http.post('', params); // TODO
    }
  }

  /**
   * Change the default storage method.
   * @param storage The storage type.
   */
  public setStorage(storage: Storage) {
    this.storage = storage;
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

}
