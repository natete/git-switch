import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PullRequest } from './pull-request';
import { TokenService } from '../../providers/auth/token.service';

@Injectable()
export class PullRequestsService {
  private readonly PULLREQUEST_URL = 'api/pull_request';

  private pullRequestsStream = new BehaviorSubject<PullRequest[]>([]);

  constructor(private http: Http) {}

  /**
   * Get the observable of the pull requests the user has.
   * @returns {Observable<T>} the observable of pull requests the user has.
   */
  getPullRequests(): Observable<PullRequest[]> {
    if(this.pullRequestsStream.getValue()){
      this.http
        .get(this.PULLREQUEST_URL)
        .subscribe((pullrequest: any) => this.pullRequestsStream.next(pullrequest as PullRequest[]));
    }

    return this.pullRequestsStream.asObservable();
  }

}
