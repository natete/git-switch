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

    const s = new Subject<Response>();

    this.authService.getAccessToken()
        .subscribe(accessToken => {

          if (typeof url === 'string') {
            if (!options) {
              options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `token ${accessToken}`);
          } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', `token ${accessToken}`);
          }

          super.request(url, options)
              .subscribe(resp => s.next(resp.json()));
        });

    return s.asObservable();
  }
}
