import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountsPage } from '../pages/accounts/accounts';
import { LoginPage } from '../pages/login/login';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { AuthService } from '../providers/auth/auth-service';
import { TokenService } from '../providers/auth/token-service';
import { HttpFactory } from '../providers/http/http.factory';

@NgModule({
  declarations: [
    MyApp,
    AccountsPage,
    HomePage,
    LoginPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountsPage,
    HomePage,
    LoginPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    AuthService,
    TokenService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Http, useFactory: HttpFactory, deps: [XHRBackend, RequestOptions, TokenService] }
  ]
})
export class AppModule {
}
