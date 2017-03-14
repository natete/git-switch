import { Injectable } from '@angular/core';
import { Auth } from './auth';

@Injectable()
export class TokenService {

  constructor() { }

  /**
   * Set the token into the local storage.
   * @param token The token value.
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Get the current stored token.
   * @returns {any|null} The value of the token if there is any.
   */
  getToken(): any {
    const accessData = localStorage.getItem('token');
    return accessData ? JSON.parse(accessData) : null;
  }

  /**
   * Clean the value of the stored token.
   */
  revokeToken(): void {
    localStorage.removeItem('token');
  }
}
