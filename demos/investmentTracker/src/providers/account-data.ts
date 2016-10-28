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
    if (WindowsAzure) {
      this.getAzureClient().login("aad").done(this.loginResponse.bind(this));
    }
  }

  private loginResponse(response: Microsoft.WindowsAzure.User) {
    // this.setUsername(response.userId);
    // this.userid = response.userId;
    // this.loggedIn = true;
    this.events.publish('user:login');
  }

  load(): any {
    if (typeof (WindowsAzure) == "undefined") {
      return new Promise(resolve => {
        // We're using Angular Http provider to request the data,
        // then on the response it'll map the JSON data to a parsed JS object.
        // Next we process the data and resolve the promise with the new data.
        this.http.get('assets/data/data.json').subscribe(res => {
          this.data = res.json();
          resolve(this.data);
        });
      });
    } else {
      let accounts = this.getAzureClient().getTable("Accounts");
      return new Promise(resolve => {
        accounts.read().then((data) => {
          this.data = this.processData(data);
          resolve(this.data);
        });
      });
    }
  }

  addAccount(account: any) {
    let newAccount = {
      "name": account.name,
      "type": account.type
    };
    return this.azureAppService.getTable("Accounts").insert(newAccount);
  }

  processData(data: Array<any>) {
    let output = {accounts: [], investments: []};
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

  processSession(data, session) {
    // loop through each speaker and load the speaker data
    // using the speaker name as the key
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        let speaker = data.speakers.find(s => s.name === speakerName);
        if (speaker) {
          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if (session.tracks) {
      session.tracks.forEach(track => {
        if (data.tracks.indexOf(track) < 0) {
          data.tracks.push(track);
        }
      });
    }
    session.favorite = this.user.hasFavorite(session.name);
  }

  getAccounts() {
    return this.load().then(data => {
      return data.accounts;
    });
  }

  filterSession(session, queryWords, excludeTracks, segment) {

    //  let matchesQueryText = false;
    //  if (queryWords.length) {
    //    // of any query word is in the session name than it passes the query test
    //    queryWords.forEach(queryWord => {
    //      if (session.name.toLowerCase().indexOf(queryWord) > -1) {
    //        matchesQueryText = true;
    //      }
    //    });
    //  } else {
    //    // if there are no query words then this session passes the query test
    //    matchesQueryText = true;
    //  }

    //  // if any of the sessions tracks are not in the
    //  // exclude tracks then this session passes the track test
    //  let matchesTracks = false;
    //  session.tracks.forEach(trackName => {
    //    if (excludeTracks.indexOf(trackName) === -1) {
    //      matchesTracks = true;
    //    }
    //  });

    //  // if the segement is 'favorites', but session is not a user favorite
    //  // then this session does not pass the segment test
    //  let matchesSegment = false;
    //  if (segment === 'favorites') {
    //    if (this.user.hasFavorite(session.name)) {
    //      matchesSegment = true;
    //    }
    //  } else {
    //    matchesSegment = true;
    //  }

    //  // all tests must be true if it should not be hidden
    //  session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }
}
