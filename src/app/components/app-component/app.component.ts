import { Component, OnInit } from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/forms';

import {RSS} from '../../model/RSS';
import {RssService} from '../../services/rss.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: '/app/components/app-component/app.component.html',
  directives: [FORM_DIRECTIVES]
})
export class AppComponent implements OnInit {
  manyRss: RSS[];
  selectedRss: RSS;
  link: string;

  constructor(private rssService: RssService) { }

  getListOfRss() {
    //this.rssService.getRss().then(rss => this.manyRss = rss);
    this.manyRss = this.rssService.getRss();
  }

  onSelect(rss: RSS) {
    this.selectedRss = rss;
  }

  onSubmit(){
    this.rssService.addLink(this.link);
    console.log("submit link: " + this.link);
  }

  ngOnInit() {
    this.getListOfRss();
    this.selectedRss = this.manyRss[0];
  }
}
