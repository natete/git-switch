import { Injectable } from '@angular/core';
import { Setting } from './setting';
import { BehaviorSubject, Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class SettingsService {
  private readonly SETTINGS_URL = 'api/settings';

  private settingsStream = new BehaviorSubject<Setting[]>([]);

  constructor(private http: Http){}

  /**
   * Get the observable of the settings the user has.
   * @returns {Observable<T>} the observable of settings the user has.
   */
  getSettings(): Observable<Setting[]> {
    if(this.settingsStream.getValue()){
      this.http
          .get(this.SETTINGS_URL)
          .map(response => response.json().data as Setting[])
          .subscribe(setting => this.settingsStream.next(setting));
    }

    return this.settingsStream.asObservable();
  }
}