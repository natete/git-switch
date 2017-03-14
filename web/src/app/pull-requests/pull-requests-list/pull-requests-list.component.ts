import { Component, OnInit } from '@angular/core';
import { PullRequest } from '../pull-request';
import { PullRequestsService } from '../pull-requests.service';
import { SpinnerService } from '../../shared/providers/spinner.service';

@Component({
  selector: 'app-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent implements OnInit {

  private pullRequests: PullRequest[];

  constructor(private pullRequestService: PullRequestsService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {

    this.spinnerService.showSpinner();

    // Subscribe to the pull requests list.
    this.pullRequestService.getPullRequests()
      .filter(pullRequests => !!pullRequests)
      .do(() => this.spinnerService.hideSpinner())
      .subscribe(
        (pullRequests) => this.pullRequests = pullRequests,
        (error) => console.log(error)
      );
  }

}
