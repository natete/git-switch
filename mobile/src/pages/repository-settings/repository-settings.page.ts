import { Component } from '@angular/core';
import { NavParams, LoadingController, NavController } from 'ionic-angular';
import { Setting } from '../settings/setting';
import { RepositorySetting } from './repository-setting';
import { RepositorySettingsService } from './repository-settings.service';
import { SettingsPage } from '../settings/settings.page';

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
    commitsIssues: 'commitsIssues'
  };

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
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
        this.repositorySetting.newOnesPull = value; break;
      case 'commentsPull':
        this.repositorySetting.commentsPull = value; break;
      case 'commitsPull':
        this.repositorySetting.commitsPull = value; break;
      case 'newOnesIssues':
        this.repositorySetting.newOnesIssues = value; break;
      case 'commitsIssues':
        this.repositorySetting.commitsIssues = value; break;
    }
  }

  updateRepositorySetting(): void{
    this.repositorySettingsService.updateRepositorySettings(this.repositorySetting).then(() => this.goToSettings());
  }

  private goToSettings(){
    this.navCtrl.push(SettingsPage);
  }

}
