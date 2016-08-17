import { Component, OnInit } from '@angular/core';

import {RSS} from '../../model/RSS';
import {Article} from '../../model/Article';
import {RssService} from '../../services/rss.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: '/app/components/app-component/app.component.html'
})
export class AppComponent implements OnInit {
  manyRss: RSS[];
  selectedRss: RSS;
  articles: Article[];

  //form value;
  link: string;

  constructor(private rssService: RssService) { }

  getListOfRss() {
    this.rssService.getManyRss().then(rss => {
      if(rss !== null){
        this.manyRss = rss;
      }
    });
    //this.manyRss = this.rssService.getRss();
  }

  onSelect(rss: RSS) {
    this.selectedRss = rss;
    this.articles = rss.articles;
  }

  onSubmit() {
    this.rssService.addLink(this.link).then(rss => {
      if(rss === null){
        console.log("onSubmit: co loi xay ra");
      }else{
        this.manyRss.push(rss);
        alert("them rss thanh cong");
        console.log("onSubmit: them thanh cong");
      }
    });
    console.log("submit link: " + this.link);
  }

  onDelete(rss : RSS){
    console.log("delete this: " + rss.title);
  }

  onRefesh(rss : RSS){
    console.log("refesh this: " + rss.title);
  }

  ngOnInit() {
    this.getListOfRss();
    //console.log("manyRss.length = " + this.manyRss.length);
  }
}
