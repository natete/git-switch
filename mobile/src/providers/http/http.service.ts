import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend, Response, Headers, RequestOptionsArgs, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from '../auth/token.service';
import { Observable } from 'rxjs';
import { Auth } from '../auth/auth';

@Injectable()
export class HttpService extends Http {

  authData: Auth = new Auth();
  constructor(backend: XHRBackend,
              options: RequestOptions,
              private tokenService: TokenService) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

    // const s = new Subject<Response>();

    this.tokenService
        .getToken()
        .then(token => this.authData =  new Auth(token));

    if (this.authData && this.authData.tokenType) {
      if (typeof url === 'string') {
        if (!options) {
          options = { headers: new Headers() };
        }
        options.headers.set('Authorization', `${this.authData.tokenType} ${this.authData.accessToken}`);
      } else {
        // we have to add the token to the url object
        url.headers.set('Authorization', `${this.authData.tokenType} ${this.authData.accessToken}`);
        url.headers.set('Access-Control-Allow-Origin', '*');
        url.headers.set('Accept', '*/*');
        url.headers.set('Accept-Charset', '*');
        url.headers.set('Accept-Language', '*');
        url.headers.set('Accept-Encoding', '*');
      }
    }

    return super.request(url, options)
                .map(res => res.json());

    // return s.asObservable();
  }

}
