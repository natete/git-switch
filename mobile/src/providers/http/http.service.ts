import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend, Response, Headers, RequestOptionsArgs, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from '../auth/token.service';
import { Observable } from 'rxjs';
import { Auth } from '../auth/auth';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              private tokenService: TokenService) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

    // const s = new Subject<Response>();

    const authData = new Auth(this.tokenService.getToken());

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
