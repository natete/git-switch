import { NgModule, ErrorHandler } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountsPage } from '../pages/accounts/accounts.page';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth/auth.service';
import { TokenService } from '../providers/auth/token-service';
import { HttpFactory } from '../providers/http/http.factory';
import { AccountsService } from '../pages/accounts/accounts.service';
import { InMemoryDataService } from '../assets/database/in-memory-data.service';

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
    IonicModule.forRoot(MyApp),
    InMemoryWebApiModule.forRoot(InMemoryDataService)
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
    AccountsService,
    AuthService,
    TokenService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Http, useFactory: HttpFactory, deps: [XHRBackend, RequestOptions, TokenService] }
  ]
})
export class AppModule {
}
