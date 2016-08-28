import {Injectable} from '@angular/core';
import {Http, Response,URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Article} from '../';
import {HttpMethod} from '../shared/HttpMethod';

@Injectable()
export class ArticleService {
    private articleUrl = '/rss-app/article';
    private sessionUser = 'myuser';

    constructor(private http: HttpMethod) { }

    /**
     * hàm dùng để yêu cầu delete 1 article 
     * 
     * @param {Article} article
     * @returns {Promise<Article>}
     */
    deleteArticle(article: Article): Promise<Article> {
        let url = this.articleUrl.concat('/delete/', this.sessionUser, '/');
        let param = new URLSearchParams();
        param.append('feedTitle',article.feedTitle);
        param.append('articleTitle',article.title);
        console.log('the link: ' + url);
        return this.http.delete(url,param).then(res => article)
            .catch(error => {
                console.error('deleteArticle error: ' + error);
                return null;
            });
    }

    /**
     * hàm dùng để yêu cầu delete các
     * articles 
     * 
     * @param {Article[]} articles
     * @returns {Promise<Article[]>}
     */
    deleteArticles(articles: Article[]): Promise<Article[]> {
        let url = this.articleUrl.concat('/deletes/', this.sessionUser, '/');
        let param = new URLSearchParams();
        param.append('feedTitle',articles[0].feedTitle);
        let json = [];
        articles.forEach(a => json.push(a.title));
        return this.http.put(JSON.stringify(json), url,param)
            .then(res => {
                console.log('deleteArticles response body: ' + res.text());
                return articles;
            })
            .catch(error => {
                console.error('deleteArticles error: ' + error);
                return null;
            });
    }

    /**
     * hàm dùng để yêu cầu update giá trị isRead
     * của articles 
     * 
     * @param {Article[]} articles các articles cần update
     * @returns {Promise<Article[]>} 
     */
    updateArticles(articles: Article[]): Promise<Article[]> {
        let url = this.articleUrl.concat('/updates/', this.sessionUser, '/');
        let param = new URLSearchParams();
        param.append('feedTitle',articles[0].feedTitle);
        let json = [];
        articles.forEach(a => json.push(a.title));
        return this.http.put(JSON.stringify(json), url,param)
            .then(res => articles)
            .catch(error => {
                console.error('updateArticles error: ' + error);
                return null;
            });
    }

    updateArticle(article: Article): Promise<Article> {
        let url = this.articleUrl.concat('/update/', this.sessionUser,'/');
        let param = new URLSearchParams();
        param.append('feedTitle',article.feedTitle);
        param.append('articleTitle',article.title);
        param.append('isRead',''+article.isRead);
        return this.http.put('', url,param)
            .then(res => article)
            .catch(error => {
                console.error('updateArticle error: ' + error);
                return null;
            });
    }
}