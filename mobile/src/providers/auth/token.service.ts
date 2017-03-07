import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/nativestorage';

@Injectable()
export class TokenService {

  constructor() { }

  /**
   * Saves the token in the native storage.
   * @param token the token to be stored.
   * @returns {Promise<any>} with the result of the storage process.
   */
  setToken(token: any): Promise<void> {
    return NativeStorage.setItem('token', token);
  }

  /**
   * Returns the token stored in the device.
   * @returns {Promise<any>} with the stored token.
   */
  getToken(): Promise<any> {
    return NativeStorage.getItem('token');
  }

  /**
   * Removes the token from the device.
   * @returns {Promise<any>} with the result of the removal process.
   */
  revokeToken(): Promise<void> {
    return NativeStorage.remove('token');
  }
}
