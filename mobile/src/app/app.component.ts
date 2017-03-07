import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth/auth.service';
import { LoginPage } from '../pages/login/login.page';
import 'rxjs/add/operator/do';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(private platform: Platform,
              private authService: AuthService) {

    this.initApp();

    this.initLoginSubscription();
  }

  private initApp() {
    this.platform.ready()
        .then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          StatusBar.styleDefault();
          Splashscreen.hide();
        });
  }

  initLoginSubscription() {
    this.authService
        .getAuthStream()
        .do(() => console.log('authstream'))
        .subscribe(
          () => this.nav.setRoot(TabsPage),
          () => this.nav.setRoot(LoginPage)
        );
  }
}
