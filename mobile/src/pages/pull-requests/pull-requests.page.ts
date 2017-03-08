import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { PullRequest } from './pull-requests';
import { PullRequestsService } from './pull-requests.service';

@Component({
  selector: 'page-pull-requests',
  templateUrl: 'pull-requests.page.html'
})
export class PullRequestsPage {

  pullRequests: PullRequest[];

  constructor(private loadingController: LoadingController,
              private pullRequestsService: PullRequestsService) {}

  ionViewDidLoad() {
    const loader = this.loadingController.create({
      content: 'Getting pull request...'
    });

    loader.present();

    this.pullRequestsService
        .getPullRequests()
        .subscribe(pullRequests => {
          this.pullRequests = pullRequests;
          loader
            .dismiss()
            .catch(() => console.log('Already dismissed'));
        });
  }

}
