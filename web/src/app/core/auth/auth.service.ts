import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { TokenService } from './token.service';
import { Auth } from './auth';

@Injectable()
export class AuthService {

  constructor(private tokenService: TokenService) { }

  /**
   * Check if there is a token.
   * @returns {Observable<boolean>}.
   */
  isAuthenticated(): Observable<boolean> {
    let isAuthSubject = new ReplaySubject<boolean>();

    isAuthSubject.next(!!this.tokenService.getToken());

    return isAuthSubject.asObservable();
  }

  /**
   * Return the current token.
   * @returns {Auth} string or undefined if no token has been set.
   */
  getAccessToken(): Auth {
    return new Auth(this.tokenService.getToken());
  }
}
