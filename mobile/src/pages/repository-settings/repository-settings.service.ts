import { Injectable } from '@angular/core';
import { RepositorySetting } from './repository-setting';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs';

@Injectable()
export class RepositorySettingsService {
  private readonly REPOSITORYSETTINGS_URL = 'api/repositorySettings';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getRepositorySettings(settingId: number): Observable<RepositorySetting> {
    const url = `${this.REPOSITORYSETTINGS_URL}/${settingId}`;
    return this.http
        .get(url)
        .map(response => response.json().data as RepositorySetting)
  }

  updateRepositorySettings(repositorySetting: RepositorySetting):  Promise<RepositorySetting>{
    const url = `${this.REPOSITORYSETTINGS_URL}/${repositorySetting.id}`;
    return this.http
      .put(url, JSON.stringify(repositorySetting), {headers: this.headers})
      .toPromise();
  }

}