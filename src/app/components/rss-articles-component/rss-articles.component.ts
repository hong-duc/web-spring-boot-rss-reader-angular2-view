import {Component, Input, OnInit, OnChanges, SimpleChange} from '@angular/core';

import {Article} from '../../model/Article';

@Component({
    selector: 'feed-articles',
    templateUrl: '/app/components/rss-articles-component/rss-articles.component.html'
})
export class RssArticlesComponent implements OnChanges, OnInit {

    @Input()
    articles: Article[];
    gioihan: number = 50;
    tempArticles: Article[];
    count: number;

    ngOnInit() {
        console.log('init RssArticlesComponent');
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        for (let proName in changes) {
            if (proName !== null) {
                switch (proName) {
                    case 'articles':
                        if (typeof this.articles !== 'undefined') {
                            this.tempArticles = this.articles.slice(0, 50);
                            this.count = this.articles.length;
                        }
                        console.log('rss change in RssArticlesComponent');
                        break;

                    default:
                        break;
                }
            }
        }
    }

    tangGioiHan50() {
        this.gioihan += 50;
        this.tempArticles = this.articles.slice(this.gioihan - 50, this.gioihan);
    }

    giamGioiHan50() {
        this.gioihan -= 50;
        this.tempArticles = this.articles.slice(this.gioihan - 50, this.gioihan);
    }


}
