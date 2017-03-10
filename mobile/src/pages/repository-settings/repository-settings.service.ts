import { Injectable } from '@angular/core';
import { RepositorySetting } from './repository-setting';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RepositorySettingsService {
  private readonly REPOSITORYSETTINGS_URL = 'api/repositorySettings';

  constructor(private http: Http) {
  }

  getRepositorySettings(settingId: number): Observable<RepositorySetting> {
    const url = `${this.REPOSITORYSETTINGS_URL}/${settingId}`;
    return this.http
        .get(url)
        .map(response => response.json().data as RepositorySetting)
  }

  updateRepositorySettings(repositorySetting: RepositorySetting): void {

  }

}