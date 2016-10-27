import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AccountDetailPage } from '../account-detail/account-detail';


@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(AccountDetailPage, session);
  }
}
