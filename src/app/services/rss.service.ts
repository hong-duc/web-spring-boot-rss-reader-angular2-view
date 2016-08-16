import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {RSS} from '../model/RSS';


const manyRss = [];

@Injectable()
export class RssService {
    private rssUrl = '/rss-app';
    private sessionUser = 'myuser';

    constructor(
        private http: Http
    ) { }

    getRss() {
        return this.http.get(this.rssUrl + '/' + this.sessionUser)
            .toPromise()
            .then(response => response.json() as RSS[],
            error => alert(JSON.stringify(error)))
            .catch(this.handleError);
        //return manyRss as RSS[];            
    }

    addLink(link: string): Promise<RSS> {
        var json = "{'link' : '" + link + "', 'user' : '" + this.sessionUser + "'}";
        return this.post(json);
    }

    //Add new rss
    private post(resource: string): Promise<RSS> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        console.log("post chay");

        return this.http.post(this.rssUrl, resource, headers)
            .toPromise()
            .then(res => {
                console.log("status code: " + res.status);
                return res.json() as RSS
            }, error => console.log("reject: " + error))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        switch (error.status) {
            case 406:
                alert(error.message || error);
                break;
        
            default:
                break;
        }
        return Promise.reject(error.message || error);
    }
}


