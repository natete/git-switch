import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Repository } from './repository/repository';
import { Http} from '@angular/http';

@Injectable()
export class ConfigurationService {

  private repositories = new BehaviorSubject<Repository[]>(null);

  constructor(private http: Http) {
    this.refreshConnectedAccounts()
      .subscribe((res: Repository[]) => this.repositories.next(res));
  }

  /**
   * Get the observable list of repositories.
   * @returns {Observable<Repository[]>}.
   */
  getRepositories(): Observable<Repository[]> {
    return this.repositories.asObservable();
  }


  /**
   * Get the list of connected accounts.
   * @returns {Observable<R>}.
   */
  private refreshConnectedAccounts(): Observable<Repository[]> {
    return this.http.get('/assets/json/repos.json') //TODO use the proper endpoint
      .catch((err: any) => Observable.throw(err));
  }

}
