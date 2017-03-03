import { Injectable } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from '../auth/token-service';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              private tokenService: TokenService) {
    super(backend, options);
  }

}
