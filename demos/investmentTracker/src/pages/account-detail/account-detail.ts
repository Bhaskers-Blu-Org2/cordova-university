import { Component, NgZone } from '@angular/core';

import { NavParams, ModalController } from 'ionic-angular';

import { AccountData } from '../../providers/account-data';
import { AddInvestmentModal } from '../add-investment-modal/add-investment';

@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailPage {
  account: any;
  investments = [];

  constructor(public navParams: NavParams,
    public accountData: AccountData,
    public modalCtrl: ModalController,
    public zone: NgZone) {
    this.account = navParams.data;
    this.updateInvestments();
  }

  updateInvestments() {
    this.accountData.getInvestments(this.account.id).then(investments => {
      this.zone.run(() => {
        this.investments = investments.filter(investment => investment.accountId === this.account.id);
      })
    })
  }

  add() {
    let modal = this.modalCtrl.create(AddInvestmentModal, { "accountId": this.account.id });
    modal.present().then(() => {
      this.updateInvestments();
    });
  }
}
