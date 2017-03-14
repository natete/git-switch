import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Request, Response, XHRBackend, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              private authService: AuthService) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

    // const s = new Subject<Response>();

    const authData = this.authService.getAccessToken();

    if (authData && authData.tokenType) {
      if (typeof url === 'string') {
        if (!options) {
          options = { headers: new Headers() };
        }
        options.headers.set('Authorization', `${authData.tokenType} ${authData.accessToken}`);
      } else {
        // we have to add the token to the url object
        url.headers.set('Authorization', `${authData.tokenType} ${authData.accessToken}`);
      }
    }

    return super.request(url, options)
        .map(res => res.json());

    // return s.asObservable();
  }
}
