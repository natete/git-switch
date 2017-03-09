import { Injectable } from '@angular/core';
import { RepositorySetting } from './repository-setting';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RepositorySettingsService {
  private readonly REPOSITORYSETTINGS_URL = 'api/repositorySettings';

  private repositorySettingsStream = new BehaviorSubject<RepositorySetting[]>([]);

  constructor(private http: Http) { }

  getRepositorySettings(settingId: number) {
    const url = `${this.REPOSITORYSETTINGS_URL}/${settingId}`;

  }

  updateRepositorySettings(repositorySetting: RepositorySetting){

  }

}