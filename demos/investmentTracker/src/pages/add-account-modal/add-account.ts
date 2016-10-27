import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'add-account.html'
})
export class AddAccountModal {
  accountName: string;
  accountType: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

  }

  save() {
    this.viewCtrl.dismiss();
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
