import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})
export class LoginPage {

  username: string;
  password: string;
  errorMessage: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private authService: AuthService) {}

  ionViewDidLoad() { }

  login(): void {
    this.authService.login(this.username, this.password)
        .then(() => console.log('logged in'))
        .catch(() => this.errorMessage = 'Invalid username and/or password');
  }
}
