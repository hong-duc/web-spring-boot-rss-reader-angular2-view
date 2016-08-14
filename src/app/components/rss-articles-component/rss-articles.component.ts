import {Component, Input, OnInit, OnChanges,SimpleChange} from '@angular/core';

import {RSS} from '../../model/RSS';
import {Article} from '../../model/Article';

@Component({
    selector: 'rss-articles',
    templateUrl: '/app/components/rss-articles-component/rss-articles.component.html'
})
export class RssArticlesComponent implements OnChanges,OnInit{
    
    @Input() rss:RSS;
    articles: Article[];
    count: number;
    gioihan: number = 50;
    message: string;

    ngOnInit(){
        this.articles = this.rss.articles;
        this.count = this.articles.length;
        this.message = this.gioihan-49+'-'+this.gioihan+' of '+this.count;
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
        for(let proName in changes){
            switch (proName) {
                case 'rss':
                    this.rss = changes['rss'].currentValue;
                    this.articles = this.rss.articles.slice(0,50);
                    break;
            
                default:
                    break;
            }
        }
    }

    tangGioiHan50(){
        this.gioihan += 50;
        this.articles = this.rss.articles.slice(this.gioihan - 50,this.gioihan);
    }

    giamGioiHan50(){
        this.gioihan -= 50;
        this.articles = this.rss.articles.slice(this.gioihan - 50,this.gioihan);
    }

    
}