import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AccountData } from '../../providers/account-data';


@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailPage {
  account: any;
  investments = [];

  constructor(public navParams: NavParams, public accountData: AccountData) {
    this.account = navParams.data;
    accountData.getInvestments(this.account.id).then(investments => {
      this.investments = investments.filter(investment => investment.accountId === this.account.id);
    })
  }
}
