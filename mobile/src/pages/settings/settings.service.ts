import { Injectable } from '@angular/core';
import { Setting } from './setting';
import { BehaviorSubject, Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../providers/auth/token.service';

@Injectable()
export class SettingsService {
  private readonly SETTINGS_URL = 'api/settings';

  private settingsStream = new BehaviorSubject<Setting[]>([]);

  constructor(private http: Http, private tokenService:TokenService){}

  /**
   * Get the observable of the settings the user has.
   * @returns {Observable<T>} the observable of settings the user has.
   */
  getSettings(): Observable<Setting[]> {
    if(this.settingsStream.getValue()){
      this.http
          .get(this.SETTINGS_URL)
          .subscribe((setting: any) => this.settingsStream.next(setting as Setting[]));
    }

    return this.settingsStream.asObservable();
  }
}