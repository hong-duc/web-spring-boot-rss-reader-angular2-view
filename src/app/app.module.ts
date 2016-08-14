import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent,RssService} from './';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations:[
        AppComponent
    ],
    providers:[
        RssService
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}