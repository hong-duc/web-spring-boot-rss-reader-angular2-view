import { Component, OnInit } from '@angular/core';

import {Feed} from '../../model/Feed';
import {Article} from '../../model/Article';
import {RssService} from '../../services/rss.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: '/app/components/app-component/app.component.html'
})
export class AppComponent implements OnInit {
  feeds: Feed[];
  selectedFeed: Feed;
  articles: Article[];

  // form value;
  link: string;

  constructor(private rssService: RssService) { }

  getListOfRss() {
    console.log('get a list of Feed');
    this.rssService.getManyRss().then(rss => {
      if (rss !== null) {
        this.feeds = rss;
      }
    });
  }

  onSelect(feed: Feed) {
    this.selectedFeed = feed;
    this.articles = this.selectedFeed.articles;
  }

  onSubmit() {
    this.rssService.addLink(this.link).then(rss => {
      if (rss === null) {
        console.log('onSubmit: co loi xay ra');
      }else {
        this.feeds.push(rss);
        alert('them rss thanh cong');
        this.link = '';
        console.log('onSubmit: them thanh cong');
      }
    });
    console.log('submit link: ' + this.link);
  }

  onDelete(rss: Feed) {
    console.log('delete this: ' + rss.title);
  }

  onRefesh(feed: Feed) {
    console.log('refesh this: ' + feed.title);
    this.rssService.refeshFeed(feed).then(feed => {
      if (feed !== null) {
        this.getListOfRss();
        // this.selectedFeed = feed;
      }
    });
  }

  ngOnInit() {
    console.log('init app component');
    this.getListOfRss();
  }
}
