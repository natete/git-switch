import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PullRequest } from './pull-requests';

@Injectable()
export class PullRequestsService {
  private readonly PULLREQUEST_URL = 'api/pull-requests';

  private pullRequestsStream = new BehaviorSubject<PullRequest[]>([]);

  constructor(private http: Http) { }

  /**
   * Get the observable of the pull requests the user has.
   * @returns {Observable<T>} the observable of pull requests the user has.
   */
  getPullRequests(): Observable<PullRequest[]> {
    if(this.pullRequestsStream.getValue()){
      this.http
        .get(this.PULLREQUEST_URL)
        .map(response => response.json().data as PullRequest[])
        .subscribe(pullrequest => this.pullRequestsStream.next(pullrequest));
    }

    return this.pullRequestsStream.asObservable();
  }

}
