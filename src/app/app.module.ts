import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent,RssService,RssArticlesComponent,HttpMethod,ArticleService} from './';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations:[
        AppComponent,
        RssArticlesComponent
    ],
    providers:[
        RssService,
        ArticleService,
        HttpMethod
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}