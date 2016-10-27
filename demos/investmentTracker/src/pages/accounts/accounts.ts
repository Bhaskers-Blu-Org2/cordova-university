import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';
import { AccountData } from '../../providers/account-data';
import { AddAccountModal} from '../add-account-modal/add-account';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { AccountDetailPage } from '../account-detail/account-detail';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  // the list is a child of the schedule page
  // @ViewChild('accountList') gets a reference to the list
  // with the variable #accountList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('accountList', { read: List }) accountList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions: any = [];
  groups = [];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: AccountData,
    public user: UserData
  ) {

  }

  ionViewDidEnter() {
    this.app.setTitle('Accounts');
  }

  ngAfterViewInit() {
    this.updateAccounts();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    //this.user.syncFavorites();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  updateAccounts() {
    // Close any open sliding items when the schedule updates
    this.accountList && this.accountList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {

      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  addAccount() {
    let modal = this.modalCtrl.create(AddAccountModal);
    modal.present();

    // TODO: Handle dismissal of modal
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateAccounts();
      }
    });

  }

  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(AccountDetailPage, sessionData);
  }

  addFavorite(slidingItem: ItemSliding, sessionData) {
    sessionData.favorite = true;
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData, title) {
    sessionData.favorite = false;
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateAccounts();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
