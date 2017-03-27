import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PullRequest } from './pull-request';
import { Constants } from '../../shared/constants';

@Injectable()
export class PullRequestsService {
  private readonly PULLREQUEST_URL = 'api/simple_git/pull_request?_format=json';

  private pullRequestsStream = new BehaviorSubject<PullRequest[]>([]);

  constructor(private http: Http) {}

  /**
   * Get the observable of the pull requests the user has.
   * @returns {Observable<T>} the observable of pull requests the user has.
   */
  getPullRequests(): Observable<PullRequest[]> {
    if(this.pullRequestsStream.getValue()){
      this.http
          .get(`${Constants.BACKEND_URL}/${this.PULLREQUEST_URL}`)
        .subscribe((pullrequest: any) => this.pullRequestsStream.next(pullrequest as PullRequest[]));
    }

    return this.pullRequestsStream.asObservable();
  }

}
