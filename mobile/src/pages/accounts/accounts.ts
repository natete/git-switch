import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AccountsService } from './accounts.service';
import { Account } from './account';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  accounts: Account[];
  user: Account;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingingCtrl: LoadingController,
              private accountsService: AccountsService) {}

  ionViewDidLoad() {
    const loader = this.loadingingCtrl.create({
      content: 'Getting accounts...'
    });

    loader.present();

    this.accountsService
        .getAccounts()
        .subscribe(accounts => {
          // TODO use application user
          this.user = accounts[0];
          this.accounts = accounts;
          loader.dismissAll();
        });
  }

  removeAccount(account: Account): void {
    const confirm = this.alertCtrl.create({
      title: 'Remove account',
      message: 'Are you sure you want to remove the account?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          handler: () => this.proceedRemoveAccount(account)
        }
      ]
    });

    confirm.present();
  }

  private proceedRemoveAccount(account: Account): void {
    this.accountsService.deleteAccount(account);
  }
}
