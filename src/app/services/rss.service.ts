import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Feed} from '../model/Feed';
import {Utility} from '../model/Utility';


const manyRss = [];

@Injectable()
export class RssService {
    private rssUrl = '/rss-app';
    private sessionUser = 'myuser';

    constructor(
        private http: Http
    ) { }

    // get array of rss
    getManyRss(): Promise<Feed[]> {
        return this.get(this.rssUrl + '/' + this.sessionUser)
            .then(res => JSON.parse(res.text(), Utility.parseJsonToFeed) as Feed[])
            .catch(err => {
                console.error('getManyRss: error ' + err);
                return null;
            });

    }

    // add new link
    addLink(link: string): Promise<Feed> {
        let json = '{"link" : "' + link + '", "user" : "' + this.sessionUser + '"}';
        return this.post(json, this.rssUrl).then(res => {
            return JSON.parse(res.text(), Utility.parseJsonToFeed) as Feed;
        }).catch(err => {
            console.error('addLink: an error ' + err);
            return null;
        });
    }

    // refesh the feed
    refeshFeed(feed: Feed): Promise<Feed> {
        let jsonFeed = JSON.stringify(feed);
        let json = '{"user" : "' + this.sessionUser + '","feed":' + jsonFeed + '}';

        return this.put(json, this.rssUrl)
                .then(() => feed)
                .catch(error => {
                    console.error('refeshFeed: ' + error);
                    return null;
                });
    }

    // call get to server
    private get(url: string): Promise<Response> {
        return this.http.get(url)
            .toPromise()
            .then(res => {
                console.log('get status code: ' + res.status);
               // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);
    }

    // call post to server
    private post(json: string, url: string): Promise<Response> {
        console.log('post chay voi gia tri: ' + JSON.stringify(json));
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, json, headers)
            .toPromise()
            .then(res => {
                console.log('post status code: ' + res.status);
               // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);
    }

    // call put to server
    private put(json: string, url: string): Promise<Response> {
        console.log('chay put voi gia tri: ' + json);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(url, json, headers)
            .toPromise()
            .then(res => {
                console.log('put status code: ' + res.status);
               // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);

    }

    // handle error
    private handleError(error: any): Promise<void> {
        console.error('An error occurred', error.json());
        switch (error.status) {
            case 406:
                alert(error.json() || error);
                break;
            case 404:
                alert(error.json() || error);
                break;
            default:
                alert('có lỗi lạ: ' + (error.json() || error));
                break;
        }
        return Promise.reject(error);
    }
}


