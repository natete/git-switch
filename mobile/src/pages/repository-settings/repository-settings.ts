import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Setting } from '../settings/setting';

/*
  Generated class for the RepositorySettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-repository-settings',
  templateUrl: 'repository-settings.html'
})
export class RepositorySettingsPage {

  private setting: Setting

  constructor(private navParams: NavParams) {
    this.setting = this.navParams.data;
  }

  ionViewDidLoad() {
    //this.setting = this.navParams.data;
    console.log('ionViewDidLoad RepositorySettingsPage');
  }

}
