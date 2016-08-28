import {Injectable} from '@angular/core';
import {Headers, Http, Response,URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpMethod {

    constructor(private http: Http){}


     get(url: string,param?: URLSearchParams): Promise<Response> {
        return this.http.get(url,{search: param})
            .toPromise()
            .then(res => {
                console.log('get status code: ' + res.status);
                // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);
    }

    // call post to server
    post(json: string, url: string,param?: URLSearchParams): Promise<Response> {
        console.log('post chay voi gia tri: ' + JSON.stringify(json));
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, json, {headers:headers,search:param})
            .toPromise()
            .then(res => {
                console.log('post status code: ' + res.status);
                // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);
    }

    // call put to server
    put(json: string, url: string,param?: URLSearchParams): Promise<Response> {
        console.log('chay put voi gia tri: ' + json);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(url, json,{ headers: headers, search: param })
            .toPromise()
            .then(res => {
                console.log('put status code: ' + res.status);
                // console.log('body response: ' + res.text());
                return res;
            })
            .catch(this.handleError);

    }

    // call delete to server
    delete(url: string,param?: URLSearchParams): Promise<Response> {
        console.log('chay delete');

        return this.http.delete(url,{search: param})
            .toPromise()
            .then(res => {
                console.log('delete status code: ' + res.status);
                console.log('delete body: ' + res.text());
                return res;
            })
            .catch(this.handleError);
    }

    // handle error
    handleError(error: any): Promise<void> {
        console.error('An error occurred', JSON.stringify(error.json()));
        let objError = error.json();
        switch (error.status) {
            case 406:
                alert(objError.message || error);
                break;
            case 404:
                alert(objError.message || error);
                break;
            default:
                alert('có lỗi lạ: ' + (objError.message || error));
                break;
        }
        return Promise.reject(error);
    }
}