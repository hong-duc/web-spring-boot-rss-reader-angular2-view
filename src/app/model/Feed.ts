import {Article} from './Article';

export class Feed {
    title: string;
    link: string;
    articles: Article[];

    constructor(obj: Feed) {
        this.title = obj.title;
        this.link = obj.link;
        this.articles = [];
        for (let i in obj.articles) {
            this.articles.push(new Article(obj.articles[i],this.title));
        }
    }
}
