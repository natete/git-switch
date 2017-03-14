import { Component } from '@angular/core';
import { PullRequestsPage } from '../pull-requests/pull-requests.page';
import { SettingsPage } from '../settings/settings.page';
import { AccountsPage } from '../accounts/accounts.page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PullRequestsPage;
  tab2Root: any = SettingsPage;
  tab3Root: any = AccountsPage;

  constructor() {

  }
}
