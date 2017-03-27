import { Injectable } from '@angular/core';
import { RepositorySetting } from './repository-setting';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Constants } from '../../shared/constants';

@Injectable()
export class RepositorySettingsService {
  private readonly REPOSITORYSETTINGS_URL = 'api/simple_git/repositorySettings';

  constructor(private http: Http) {}

  getRepositorySettings(settingId: number): Observable<RepositorySetting> {
    const url = `${Constants.BACKEND_URL}/${this.REPOSITORYSETTINGS_URL}/${settingId}`;
    return this.http
        .get(url)
        .map(response => response.json().data as RepositorySetting);
  }

  updateRepositorySettings(repositorySetting: RepositorySetting):  Promise<RepositorySetting>{
    const url = `${Constants.BACKEND_URL}/${this.REPOSITORYSETTINGS_URL}/${repositorySetting.id}`;
    return this.http
      .put(url, JSON.stringify(repositorySetting))
      .toPromise();
  }

}