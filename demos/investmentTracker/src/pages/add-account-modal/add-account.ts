import { Component } from '@angular/core';
import { AccountData } from '../../providers/account-data';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'add-account.html'
})
export class AddAccountModal {
  accountName: string;
  accountType: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public accountData: AccountData
  ) {

  }

  save() {
    this.accountData.addAccount({
      "name": this.accountName,
      "type": this.accountType
    }).then(() => {
      this.viewCtrl.dismiss();
    }, (err) => {
      console.log(err);
    });
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
