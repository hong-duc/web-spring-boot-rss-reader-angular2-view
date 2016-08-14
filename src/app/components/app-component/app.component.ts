import { Component, OnInit } from '@angular/core';

import {RSS} from '../../model/RSS';
import {RssService} from '../../services/rss.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  rss: RSS[]

  constructor(
    private rssService : RssService
    ){}

  private getRss(){
    //this.rssService.getRss().then(rss => this.rss = rss);
    this.rss = this.rssService.getRss();
  }


  ngOnInit() {
    this.getRss();
  }
}
