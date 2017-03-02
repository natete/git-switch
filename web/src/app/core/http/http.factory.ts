import { AuthService } from '../auth/auth.service';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './http.service';

export function httpFactory(backend: XHRBackend, options: RequestOptions, auth: AuthService) {
    return new HttpService(backend, options, auth);
}