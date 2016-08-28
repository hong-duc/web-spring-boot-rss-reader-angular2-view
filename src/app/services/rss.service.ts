import {Injectable,Inject} from '@angular/core';
import {Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Feed,Utility} from '../index';
import {HttpMethod} from '../shared/HttpMethod';


const manyRss = [];

@Injectable()
export class RssService {
    private rssUrl = '/rss-app';
    private sessionUser = 'myuser';

    constructor(
       private http: HttpMethod
    ) { }

    // get array of rss
    getManyRss(): Promise<Feed[]> {
        return this.http.get(this.rssUrl + '/' + this.sessionUser)
            .then(res => {
                let obj = JSON.parse(res.text(), Utility.parseJsonToFeed);
                let feeds: Feed[] = [];
                for (let i in obj) {
                    feeds.push(new Feed(obj[i]));
                }
                return feeds;
            })
            .catch(err => {
                console.error('getManyRss: error ' + err);
                return null;
            });

    }

    // add new link
    addLink(link: string): Promise<Feed> {
        let json = {
            'link': link,
            'user': this.sessionUser
        };
        return this.http.post(JSON.stringify(json), this.rssUrl).then(res => {
            let obj = JSON.parse(res.text(), Utility.parseJsonToFeed);
            let feed = new Feed(obj);
            return feed;
        }).catch(err => {
            console.error('addLink: an error ' + err);
            return null;
        });
    }

    // refesh the feed
    refeshFeed(feed: Feed): Promise<Feed> {
        let json = {
            'user': this.sessionUser,
            'feed': feed
        };

        return this.http.put(JSON.stringify(json), this.rssUrl)
            .then((res) => {
                let obj = JSON.parse(res.text(),Utility.parseJsonToFeed);
                let feed = new Feed(obj);
                return feed;
            })
            .catch(error => {
                console.error('refeshFeed: ' + error);
                return null;
            });
    }

    deleteFeed(feed: Feed): Promise<Feed> {
            let url = this.rssUrl + '?link=' + feed.link + '&user=' + this.sessionUser;

            return this.http.delete(url)
                .then(res => feed)
                .catch(error => {
                    console.error('deleteFeed co error: ' + error);
                    return null;
                });
    }
}


