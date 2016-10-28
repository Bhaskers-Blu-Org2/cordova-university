import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AccountsPage } from '../pages/accounts/accounts';
import { AddAccountModal } from '../pages/add-account-modal/add-account';
import { AccountDetailPage } from '../pages/account-detail/account-detail';
import { ResearchPage } from '../pages/research/research';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountData } from '../providers/account-data';
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AccountsPage,
    LoginPage,
    AccountsPage,
    AddAccountModal,
    AccountDetailPage,
    ResearchPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AccountsPage,
    LoginPage,
    AccountsPage,
    AddAccountModal,
    AccountDetailPage,
    ResearchPage,
    SignupPage,
    TabsPage
  ],
  providers: [AccountData, UserData, Storage]
})
export class AppModule { }
