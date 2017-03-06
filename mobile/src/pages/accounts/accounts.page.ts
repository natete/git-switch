import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AccountsService } from './accounts.service';
import { Account } from './account';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.page.html'
})
export class AccountsPage {
  accounts: Account[];

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
          this.accounts = accounts;
          loader
            .dismiss()
            .catch(() => console.log('Already dismissed'));
        });
  }

  /**
   * Starts the process to add a new account.
   */
  addAccount(): void {
    this.accountsService.addAccount();
  }

  /**
   * Starts the process to delete the given account.
   * @param accountId the id of the account to be deleted.
   */
  deleteAccount(accountId: number): void {
    const confirm = this.alertCtrl.create({
      title: 'Remove account',
      message: 'Are you sure you want to remove the account?',
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes', handler: () => this.proceedRemoveAccount(accountId) }
      ]
    });

    confirm.present();
  }

  /**
   * Deletes the given account.
   * @param accountId the id of the account to be deleted.
   */
  private proceedRemoveAccount(accountId: number): void {
    this.accountsService.deleteAccount(accountId);
  }
}
