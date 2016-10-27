import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailPage {
  session: any;

  constructor(public navParams: NavParams) {
    this.session = navParams.data;
  }
}
