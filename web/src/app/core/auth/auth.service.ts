import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor() { }

  isAuthenticated(): Observable<boolean> {
    // TODO
    let tempSubject = new Subject<boolean>();

    setTimeout(()=> tempSubject.next(true), 3000);

    return tempSubject.asObservable();
  }

  getAccessToken(): Observable<string> {
    // TODO
    let tempSubject = new Subject<string>();

    setTimeout(()=> tempSubject.next('TODO'), 3000);

    return tempSubject.asObservable();
  }
}
