import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './http.service';
import { TokenService } from '../auth/token.service';

export function HttpFactory(backend: XHRBackend, options: RequestOptions, tokenService: TokenService) {
    return new HttpService(backend, options, tokenService);
}