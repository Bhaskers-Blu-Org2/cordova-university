import { Component } from '@angular/core';
import { PopoverController, ViewController, AlertController } from 'ionic-angular';
import {CodePushUpdate} from '../../providers/codepush-update';


import { PopoverPage } from '../about-popover/about-popover';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: [CodePushUpdate]  
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  loggedIn: boolean = false;
  isWindows: boolean;

  constructor(
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      public updater: CodePushUpdate) {
      this.isWindows = window.cordova.platformId === 'windows';
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  checkAndInstallUpdates() {
      this.updater.checkForUpdate().then((remotePackage) => {
          if (!remotePackage) {
              let alert = this.alertCtrl.create({
                  title: 'No update available!',
                  subTitle: 'We could not find any update.',
                  buttons: ['Ok']
              });
              alert.present();
          } else {
              console.log('update available: ' + remotePackage.appVersion);
              let alert = this.alertCtrl.create({
                  title: 'Update ' + remotePackage.appVersion + ' available',
                  message: 'Would you like to update your app?',
                  buttons: [
                      {
                          text: 'Yes',
                          handler: () => {
                              this.updater.installPackage(remotePackage);
                          }
                      },
                      {
                          text: 'No',
                          handler: () => {

                          }
                      }
                  ]
              });
              alert.present();
          }
      });
  }
}
