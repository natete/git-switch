import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from './token-service';
import { Subject, Observable } from 'rxjs';

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

  getAuthStream(): Observable<void> {
    return this.authSubject.asObservable();
  }

  login(username: string, password: string): Promise<void> {
    // TODO: post a request to get the token
    const token = '';

    return this.tokenService
        .setToken(token)
        .then(() => this.authSubject.next());
  }

  logout(): void {
    this.tokenService.revokeToken();
    this.authSubject.error(null);
  }
}
