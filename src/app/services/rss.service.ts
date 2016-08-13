import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {RSS} from '../model/RSS';

@Injectable()
export class RssService{
    private rssUrl = 'http://localhost:8080/app/';

    constructor(
        private http: Http
    ){}

    getRss(){
        return this.http.get(this.rssUrl)
            .toPromise()
            .then(response => response.json().data as RSS[])
            .catch(this.handleError);
    }

    private handleError(error : any){
        console.error('An error occurred',error);
        return Promise.reject(error.message || error);
    }
}