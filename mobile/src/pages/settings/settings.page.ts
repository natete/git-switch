import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  settings = [{
    id: 1,
    name: "Forked repository name",
    fork: true, //git-network
    alert: 12,
    time: "2 years"
  },
    {
      id: 2,
      name: "Repository name",
      fork: false, //book
      alert: 7,
      time: "10 months"
    }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
