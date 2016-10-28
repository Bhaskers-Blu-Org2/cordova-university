import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Events } from 'ionic-angular';
import { UserData } from './user-data';


@Injectable()
export class AccountData {
  data: any;
  azureAppService: Microsoft.WindowsAzure.MobileServiceClient;

  constructor(public http: Http,
    public user: UserData,
    public events: Events) {
  }
  getAzureClient() {
    if (!this.azureAppService) {
      this.azureAppService = new WindowsAzure.MobileServiceClient('https://tacoinvestmenttracker.azurewebsites.net');
    }
    return this.azureAppService;
  }

  login() {
    // Only enforce login when on an actual device
    if (typeof WindowsAzure !== "undefined") {
      this.getAzureClient().login("aad").done(this.loginResponse.bind(this));
    }
  }

  private loginResponse(response: Microsoft.WindowsAzure.User) {
    // this.setUsername(response.userId);
    // this.userid = response.userId;
    // this.loggedIn = true;
    this.events.publish('user:login');
  }

  addAccount(account: any) {
    let newAccount = {
      "name": account.name,
      "type": account.type
    };
    return this.azureAppService.getTable("Accounts").insert(newAccount);
  }

  processData(data: Array<any>) {
    let output = { accounts: [], investments: [] };
    data.forEach(account => {
      output.accounts.push(
        {
          id: account.id,
          name: account.name,
          type: account.type
        }
      )
    });

    return output;
  }

  getAccounts(): Promise<any[]> {
    if (typeof WindowsAzure == "undefined") {
      return new Promise(resolve => {
        // We're using Angular Http provider to request the data,
        // then on the response it'll map the JSON data to a parsed JS object.
        // Next we process the data and resolve the promise with the new data.
        this.http.get('assets/data/data.json').subscribe(res => {
          resolve(res.json().accounts);
        });
      });
    } else {
      let accounts = this.getAzureClient().getTable("Accounts");
      return new Promise(resolve => {
        accounts.read().then((data) => {
          resolve(this.processData(data).accounts);
        });
      });
    }
  }

  getInvestments(accountId): Promise<any[]> {
    if (typeof WindowsAzure == "undefined") {
      return new Promise(resolve => {
        // We're using Angular Http provider to request the data,
        // then on the response it'll map the JSON data to a parsed JS object.
        // Next we process the data and resolve the promise with the new data.
        this.http.get('assets/data/data.json').subscribe(res => {
          this.data = res.json();
          resolve(this.data.investments);
        });
      });
    } else {
      let investments = this.getAzureClient().getTable("Investments");
      return new Promise(resolve => {
        investments.read().then((data) => {
          resolve(data);
        });
      });
    }
  }

}
