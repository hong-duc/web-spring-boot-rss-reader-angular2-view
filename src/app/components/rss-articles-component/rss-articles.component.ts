import {Component, Input, OnInit, OnChanges, SimpleChange} from '@angular/core';

import {Article} from '../../';
import {ArticleService} from '../../services/article.service';

enum SortRule {
    ByRead,
    ByNewest,
    ByABC
}


@Component({
    selector: 'feed-articles',
    templateUrl: '/app/components/rss-articles-component/rss-articles.component.html'
})
export class RssArticlesComponent implements OnChanges, OnInit {

    @Input()
    articles: Article[];
    isCheckAll: boolean = false;
    sortRule = SortRule;
    count: number = 0;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        console.log('init RssArticlesComponent');
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        for (let proName in changes) {
            switch (proName) {
                case 'articles':
                    this.changeArticle(changes[proName].currentValue);
                    console.log('rss change in RssArticlesComponent');
                    break;

                default:
                    break;
            }
        }
    }

    private changeArticle(value: Article[]) {
        if (typeof this.articles !== 'undefined') {
            this.count = this.articles.length;
            if (value.filter(a => a.checked).length === value.length && value.length > 0) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        }
    }

    checkAll(checked: boolean) {
        console.log('run check all');
        this.articles.forEach(a => a.checked = checked);
    }

    unCheckAll() {
        this.articles.forEach(a => a.checked = false);
        this.isCheckAll = false;
    }

    checkRead() {
        this.unCheckAll();
        this.articles.forEach(a => {
            if (a.isRead) {
                a.checked = true;
            }
        });
    }

    checkUnRead() {
        this.unCheckAll();
        this.articles.forEach(a => {
            if (!a.isRead) {
                a.checked = true;
            }
        });
    }

    makeCheckedRead() {
        let updateArticles: Article[] = [];
        this.articles.forEach(a => {
            if (a.checked && !a.isRead) {
                a.isRead = true;
                updateArticles.push(a);
            }
        });
        if (updateArticles.length > 0) {
            this.unCheckAll();
            this.articleService.updateArticles(updateArticles)
                .then(a => {
                    if (a === null) {
                        alert('co loi khi update articles');
                    }
                });
        }

    }

    makeRead(article: Article) {
        if (!article.isRead) {
            article.isRead = true;
            this.articleService.updateArticle(article)
                .then(article => {
                    if (article === null) {
                        alert('co loi khi update');
                    }
                });
        }
    }

    deleteChecked() {
        let articles = this.articles.filter(a => a.checked);
        if (articles.length !== 0) {
            this.unCheckAll();
            this.articleService.deleteArticles(articles)
                .then(a => {
                    if (a !== null) {
                        this.deleteArticles(a);
                    } else {
                        alert('có lỗi xảy ra không xóa được mở console để biết thêm');
                    }
                })
        }
    }

    private deleteArticles(articles: Article[]) {
        articles.forEach(a => {
            let i = this.articles.indexOf(a);
            this.articles.splice(i, 1);
        });
    }

    sort(rule: SortRule) {
        switch (rule) {
            case this.sortRule.ByRead:
                this.articles.sort(this.SortByRead);
                break;
            case this.sortRule.ByNewest:
                this.articles.sort(this.SortByNewest);
                break;
            case this.sortRule.ByABC:
                this.articles.sort(this.SortByABC);
                break;

            default:
                this.articles.sort(this.SortByABC);
                break;
        }
    }

    private SortByRead(a1: Article, a2: Article): number {
        if (!a1.isRead) {
            return -1;
        } else {
            return 1;
        }
    }

    private SortByNewest(a1: Article, a2: Article): number {
        if (a1.publishDate > a2.publishDate) {
            return -1;
        } else {
            return 1;
        }
    }

    private SortByABC(a1: Article, a2: Article): number {
        if (a1.title > a2.title) {
            return 1;
        } else {
            return -1;
        }
    }
}
