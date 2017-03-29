import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PullRequest } from './pull-request';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';

@Injectable()
export class PullRequestsService {

  private readonly PULLREQUEST_ENDPOINT = `${Constants.BACKEND_URL}/api/simple_git/pull_request?_format=json`;
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
    return this.http.get(`${this.PULLREQUEST_ENDPOINT}`)
      .catch((err: any) => Observable.throw(err));
  }

}
