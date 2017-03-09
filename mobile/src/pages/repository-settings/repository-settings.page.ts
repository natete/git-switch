import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Setting } from '../settings/setting';
import { RepositorySetting } from './repository-setting';
import { RepositorySettingsService } from './repository-settings.service';

/*
  Generated class for the RepositorySettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-repository-settings',
  templateUrl: 'repository-settings.page.html'
})
export class RepositorySettingsPage {

  setting: Setting;
  repositorySetting: RepositorySetting;
  newOnesPull: boolean = false;
  commitsPull: boolean = false;
  commentsPull: boolean = false;
  newOnesIssues: boolean = false;
  commitsIssues: boolean = false;

  constructor(private navParams: NavParams,
              private loadingController: LoadingController,
              private repositorySettingsService: RepositorySettingsService) {
  }

  ionViewDidLoad() {
    this.setting = this.navParams.data;

    const loader = this.loadingController.create({
      content: 'Getting repository setting...'
    });

    loader.present();

    this.repositorySettingsService
        .getRepositorySettings(this.setting.id)
        .subscribe(RepositorySetting => {
          this.repositorySetting = RepositorySetting;
          loader
            .dismiss()
            .catch(() => console.log('Already dismissed'));
        });

    this.newOnesPull = this.repositorySetting.pullRequest.newOnes;
    this.commitsPull = this.repositorySetting.pullRequest.commits;
    this.commentsPull = this.repositorySetting.pullRequest.comments;
    this.newOnesIssues = this.repositorySetting.issues.newOnes;
    this.commitsIssues = this.repositorySetting.issues.commits;
  }

  newOnesPullChanged(){
    this.repositorySetting.pullRequest.newOnes = this.newOnesPull;
  }

  commitsPullChanged(){
    this.repositorySetting.pullRequest.commits = this.commitsPull;
  }

  commentsPullChanged(){
    this.repositorySetting.pullRequest.comments = this.commentsPull;
  }

  newOnesIssuesChanged(){
    this.repositorySetting.issues.newOnes = this.newOnesIssues;
  }

  commitsIssuesChanged(){
    this.repositorySetting.issues.commits = this.commitsIssues;
  }

  updateRepositorySetting(){
    this.repositorySettingsService.updateRepositorySettings(this.repositorySetting);
  }

}
