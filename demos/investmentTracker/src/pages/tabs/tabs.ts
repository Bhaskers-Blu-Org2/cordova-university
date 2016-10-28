import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AccountsPage } from '../accounts/accounts';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = AccountsPage;
  tab2Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
