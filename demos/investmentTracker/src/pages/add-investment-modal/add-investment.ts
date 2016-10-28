import { Component } from '@angular/core';
import { AccountData } from '../../providers/account-data';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'add-investment.html'
})
export class AddInvestmentModal {
  symbol: string;
  purchasePrice: number;
  numberOfShares: number;
  purchaseDate: Date;
  accountId: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public accountData: AccountData
  ) {
    this.accountId = navParams.get("accountId");
  }

  save() {
    this.accountData.addInvestment({
      "accountId": this.accountId,
      "symbol": this.symbol,
      "purchaseDate": this.purchaseDate,
      "numberOfShares": this.numberOfShares,
      "purchasePrice": this.purchasePrice
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
