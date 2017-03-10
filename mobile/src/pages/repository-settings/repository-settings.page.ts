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
  toogle = {
    newOnesPull: 'newOnesPull',
    commentsPull: 'commentsPull',
    commitsPull: 'commitsPull',
    newOnesIssues: 'newOnesIssues',
    commitsIssues: 'commitsIssues',
  }

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
        .filter(repoSettings => !!repoSettings)
        .subscribe(repositorySetting => {
          this.repositorySetting = repositorySetting;
          loader
            .dismiss()
            .catch(() => console.log('Already dismissed'));
        });
  }

  getProp(prop) {
    switch (prop){
      case'newOnesPull': return this.repositorySetting.newOnesPull;
      case 'commentsPull': return this.repositorySetting.commentsPull;
      case 'commitsPull': return this.repositorySetting.commitsPull;
      case 'newOnesIssues': return this.repositorySetting.newOnesIssues;
      case 'commitsIssues': return this.repositorySetting.commitsIssues;
    }
  }

  setProp(prop, value) {
    switch (prop) {
      case'newOnesPull':
        this.repositorySetting.newOnesPull = value;
      case 'commentsPull':
        this.repositorySetting.commentsPull = value;
      case 'commitsPull':
        this.repositorySetting.commitsPull = value;
      case 'newOnesIssues':
        this.repositorySetting.newOnesIssues = value;
      case 'commitsIssues':
        this.repositorySetting.commitsIssues = value;
    }
  }

  updateRepositorySetting(){
    //this.repositorySettingsService.updateRepositorySettings(this.repositorySetting);
  }

}
