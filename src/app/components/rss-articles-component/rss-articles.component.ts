import {Component, Input} from '@angular/core';

import {RSS} from '../../model/RSS';

@Component({
    selector: 'rss-articles',
    templateUrl: '/app/components/rss-articles-component/rss-articles.component.html'
})
export class RssArticlesComponent{
    @Input()
    rss:RSS;
}