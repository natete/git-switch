import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';
import { TokenService } from '../core/auth/token.service';

@Injectable()
export class LoginService {

  constructor(private http: Http,
              private tokenService: TokenService) { }

  /**
   * Log in the application and store the token.
   * @param username The username.
   * @param password The password.
   * @returns {Promise<boolean>} That resolves if everything goes fine or it's rejected otherwise.
   */
  login(username: string, password: string): Promise<boolean> {
    const loginEndpoint = 'oauth/token';
    const requestBody = this.buildRequestBody(username, password);

    return this.http.post(`${Constants.BACKEND_URL}/${loginEndpoint}`, requestBody)
               .toPromise()
               .then(res => this.tokenService.setToken(JSON.stringify(res)));
  }

  /**
   * Builds the request body for the login request.
   * @param username The username to add to the request body.
   * @param password The password to add to the request body.
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
