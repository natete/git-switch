import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Setting } from './setting';
import { SettingsService } from './settings.service';
import { RepositorySettingsPage } from '../repository-settings/repository-settings.page';

/*
 Generated class for the Settings page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html'
})
export class SettingsPage {

  settings: Setting[];

  constructor(private navCtrl: NavController,
              private loadingController: LoadingController,
              private settingsService: SettingsService) {}

  ionViewDidLoad() {
    const loader = this.loadingController.create({
      content: 'Getting settings...'
    });

    loader.present();

    this.settingsService
        .getSettings()
        .subscribe(settings => {
          this.settings = settings;
          loader
            .dismiss()
            .catch(() => console.log('Already dismissed'));
        });
  }

  goToRepositorySettings(setting){
    this.navCtrl.push(RepositorySettingsPage, setting);
  }

}
