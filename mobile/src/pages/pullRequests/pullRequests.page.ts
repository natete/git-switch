import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PullRequest } from './pullRequests';
import { PullRequestsService } from './pullRequests.service';

@Component({
  selector: 'page-pullrequests',
  templateUrl: 'pullRequests.page.html'
})
export class PullRequestsPage {

  pullRequests: PullRequest[];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private loadingController: LoadingController,
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
