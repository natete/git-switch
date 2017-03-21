import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from './account';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class AccountService {

  private storage: Storage = localStorage;
  private accounts = new BehaviorSubject<Account[]>(null);

  constructor(private http: Http) {
    this.refreshConnectedAccounts()
      .subscribe((res: Account[]) => this.accounts.next(res));
  }

  /**
   * Get the observable list of accounts.
   * @returns {Observable<Account[]>}.
   */
  getAccounts(): Observable<Account[]> {
    return this.accounts.asObservable();
  }

  /**
   * Initiate the process for getting a git login code.
   */
  addAccountGitHub(): void {
    const nonce = this.createNonce();
    this.storage.setItem('GitHubNonce', nonce);

    this.http.get('/assets/json/github-client.json')
      .subscribe(
        (gitHubClient: any) => {
          const params = new URLSearchParams();

          params.set('client_id', gitHubClient.client_id);
          params.set('redirect_uri', `${window.location.protocol}//${window.location.hostname}:${window.location.port}/accounts?account=hub`);
          params.set('state', nonce);
          params.set('scope', 'user, repo');
          params.set('allow_signup', 'false');

          location.href = 'https://github.com/login/oauth/authorize?' + params.toString();
        }
      )
  }

  addAccountGitLab(): void {
    const nonce = this.createNonce();
    this.storage.setItem('GitLabNonce', nonce);

    this.http.get('/assets/json/gitlab-client.json')
      .subscribe(
        (gitHubClient: any) => {
          const params = new URLSearchParams();

          params.set('client_id', gitHubClient.client_id);
          params.set('redirect_uri', `${window.location.protocol}//${window.location.hostname}:${window.location.port}/accounts?account=lab`);
          params.set('state', nonce);
          params.set('response_type', 'code');
          location.href = 'https://gitlab.com/oauth/authorize?' + params.toString();
        }
      )
  }

  /**
   * Disconnect an account.
   * @param account The account to disconnect.
   * @returns {Observable<void>}.
   */
  removeAccount(account: Account): Observable<void> {

    const params = new URLSearchParams();
    params.set('accountId', account.id.toString());

    // return this.http.post('', params) // TODO User the correct endpoint and method
    return this.http.get('/assets/json/github-client.json')
      .map(() => {
        let currentValue: Account[] = this.accounts.getValue();
        const accountIndex = currentValue.indexOf(account);
        currentValue.splice(accountIndex, 1);
        this.accounts.next(currentValue);
      });
  }

  /**
   * Authorize the user account.
   * @param code The code to send to the BE so that it can obtain the access token.
   * @param nonce The nonce to check if the petition has been compromised.
   * @return {Observable<void>}.
   */
  authorizeAccount(code: string, nonce: string, type: string): Observable<void> {
    let currentNonce, api: string = null;
    if (type === 'hub') {
      currentNonce = this.storage.getItem('GitHubNonce');
      api = '/assets/json/new-account-hub.json';

    }
    if (type === 'lab') {
      currentNonce = this.storage.getItem('GitLabNonce');
      api = '/assets/json/new-account-lab.json';
    }
    if (currentNonce === nonce) {
      const params = new URLSearchParams();
      params.set('code', code);
      params.set('nonce', nonce);

      //this.http.post('', params); // TODO
      return this.http.get(api)
        .map((res) => {
          const currentValue: Account[] = this.accounts.getValue();
          currentValue.push(new Account(res));
          this.accounts.next(currentValue);
        })
        .catch((err: any) => {
          console.log('error');
          return Observable.throw(err)
        });
    }
  }

  /**
   * Change the default storage method.
   * @param storage The storage type.
   */
  setStorage(storage: Storage): void {
    this.storage = storage;
  }

  /**
   * Get the list of connected accounts.
   * @returns {Observable<R>}.
   */
  private refreshConnectedAccounts(): Observable<Account[]> {

    const accountEndpoint = 'api/simple_git';
    return this.http.get('/assets/json/accounts.json')
    //return this.http.get(`${Constants.BACKEND_URL}/${accountEndpoint}/account/all?_format=json`)
    // .map((res: Response) => {
    //   res.json()
    // })
      .catch((err: any) => Observable.throw(err));
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
