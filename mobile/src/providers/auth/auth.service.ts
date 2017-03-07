import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { Subject, Observable } from 'rxjs';
import { Constants } from '../../shared/constants';

@Injectable()
export class AuthService {

  private authSubject = new Subject<void>();

  constructor(private http: Http,
              private tokenService: TokenService) {
    this.tokenService
        .getToken()
        .then(token => this.authSubject.next())
        .catch(() => this.authSubject.error(null));
  }

  /**
   * @returns {Observable<void>} An observable of the auth state.
   */
  getAuthStream(): Observable<void> {
    return this.authSubject.asObservable();
  }

  /**
   * Logs into the application and stores the token info.
   * @param username
   * @param password
   * @returns {Promise<void|void>} That resolves if everything goes fine or it's rejected otherwise.
   */
  login(username: string, password: string): Promise<void> {
    const loginEndpoint = 'oauth/token';
    const requestBody = this.buildRequestBody(username, password);

    return this.http.post(`${Constants.BACKEND_URL}/${loginEndpoint}`, requestBody)
               .toPromise()
               .then(res => this.tokenService.setToken(res.json()))
               .then(() => this.authSubject.next())
               .catch(err => console.log(err));
  }

  /**
   * Logs out the user and removes the token.
   */
  logout(): void {
    // TODO: Logout in the backend.
    this.tokenService.revokeToken()
        .then(() => console.log('Logged out'))
        .catch(() => console.log('Error'));
    this.authSubject.error(null);
  }

  /**
   * Builds the request body for the login request.
   * @param username
   * @param password
   * @returns {FormData} the required form data.
   */
  private buildRequestBody(username: string, password: string): FormData {

    const formData = new FormData();

    formData.append('grant_type', Constants.GRANT_TYPE);
    formData.append('client_id', Constants.CLIENT_ID);
    formData.append('client_secret', Constants.CLIENT_SECRET);
    formData.append('username', username);
    formData.append('password', password);

    return formData;
  }
}
