import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/nativestorage';

@Injectable()
export class TokenService {

  constructor() { }

  setToken(token: string): Promise<void> {
    return Promise.resolve();// NativeStorage.setItem('token', token);
  }

  getToken(): Promise<string> {
    return Promise.resolve('token');//NativeStorage.getItem('token');
  }

  revokeToken(): Promise<void> {
    return Promise.resolve();//NativeStorage.remove('token');
  }
}
