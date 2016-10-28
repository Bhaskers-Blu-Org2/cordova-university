import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-research',
  templateUrl: 'research.html'
})
export class ResearchPage {
  constructor(public navParams: NavParams) {
    //TODO: open iAB
  }

  openSite(site: string) {
    let targetSite = "";
    switch (site) {
      case "stocks":
        targetSite = 'http://www.google.com/finance'; 
        break;
      case "collegePlans":
        targetSite = 'http://www.savingforcollege.com';
        break;
    }

    if (targetSite.length > 0) {
      window.open(targetSite, "_blank", "hardwareback=no");
    }
  }
}
