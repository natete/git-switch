import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PullRequest } from './pull-request';
import { Http } from '@angular/http';

@Injectable()
export class PullRequestsService {

  private pullRequests = new BehaviorSubject<PullRequest[]>(null);

  constructor(private http: Http) {
    this.refreshPullRequestList()
      .subscribe((res: PullRequest[]) => this.pullRequests.next(res));
  }

  /**
   * Get the observable list of pull requests.
   * @returns {Observable<PullRequest[]>}
   */
  getPullRequests(): Observable<PullRequest[]> {
    return this.pullRequests.asObservable();
  }

  /**
   * Reload the pull request list.
   * @returns {Observable<R>}
   */
  private refreshPullRequestList(): Observable<PullRequest[]> {
    return this.http.get('/assets/json/pull-requests.json')
      .catch((err: any) => Observable.throw(err));
  }

}
