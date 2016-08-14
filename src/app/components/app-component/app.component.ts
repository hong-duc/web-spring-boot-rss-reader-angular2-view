import { Component, OnInit } from '@angular/core';

import {RSS} from '../../model/RSS';
import {RssService} from '../../services/rss.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: '/app/components/app-component/app.component.html'
})
export class AppComponent implements OnInit {
  manyRss: RSS[];
  selectedRss: RSS;

  constructor(private rssService: RssService) { }

  getListOfRss() {
    //this.rssService.getRss().then(rss => this.rss = rss);
    this.manyRss = this.rssService.getRss();
  }

  onSelect(rss: RSS) {
    this.selectedRss = rss;
  }

  ngOnInit() {
    this.getListOfRss();
    this.selectedRss = this.manyRss[0];
  }
}
