import { NgModule, ErrorHandler } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PullRequestsPage } from '../pages/pull-requests/pull-requests.page';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings.page';
import { AccountsPage } from '../pages/accounts/accounts.page';
import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../providers/auth/auth.service';
import { TokenService } from '../providers/auth/token.service';
import { HttpFactory } from '../providers/http/http.factory';
import { AccountsService } from '../pages/accounts/accounts.service';
import { InMemoryDataService } from '../assets/database/in-memory-data.service';
import { PullRequestsService } from '../pages/pull-requests/pull-requests.service';
import { SettingsService } from '../pages/settings/settings.service';
import { RepositorySettingsPage } from '../pages/repository-settings/repository-settings.page';
import { RepositorySettingsService } from '../pages/repository-settings/repository-settings.service';

@NgModule({
  declarations: [
    MyApp,
    AccountsPage,
    PullRequestsPage,
    LoginPage,
    SettingsPage,
    TabsPage,
    RepositorySettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountsPage,
    PullRequestsPage,
    LoginPage,
    SettingsPage,
    TabsPage,
    RepositorySettingsPage
  ],
  providers: [
    AccountsService,
    PullRequestsService,
    SettingsService,
    RepositorySettingsService,
    AuthService,
    TokenService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Http, useFactory: HttpFactory, deps: [XHRBackend, RequestOptions, TokenService] }
  ]
})
export class AppModule {
}
