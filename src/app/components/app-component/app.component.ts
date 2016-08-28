import { Component, OnInit } from '@angular/core';

import {Article,Feed} from '../../';
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

  onDelete(feed: Feed) {
    console.log('delete this: ' + feed.title);
    this.rssService.deleteFeed(feed)
        .then(feed => {
          if(feed !== null){
            let i = this.feeds.indexOf(feed);
            this.feeds.splice(i,1);
            alert('delete feed thanh cong');
          }
        });
  }

  onRefesh(feed: Feed) {
    console.log('refesh this: ' + feed.title);
    this.rssService.refeshFeed(feed).then(feed => {
      if (feed !== null) {
        let i = this.feeds.findIndex(f => f.link == feed.link);
        this.feeds[i] = feed;
        alert('update feed thanh cong');
        // this.selectedFeed = feed;
      }
    });
  }

  ngOnInit() {
    console.log('init app component');
    this.getListOfRss();
  }
}
