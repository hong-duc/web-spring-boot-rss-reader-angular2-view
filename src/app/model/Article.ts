export class Article {
    title: string;
    link: string;
    publishDate: Date;
    isRead: boolean;
    checked: boolean;
    feedTitle: string;


    constructor(obj: Article, feedTitle: string) {
        this.title = obj.title;
        this.link = obj.link;
        this.publishDate = obj.publishDate;
        this.isRead = obj.isRead;
        this.checked = false;
        this.feedTitle = feedTitle;
    }


    public getDate(): string {
        let date = this.publishDate.getDate();
        let month = this.publishDate.getMonth() + 1;
        let year = this.publishDate.getFullYear();
        return date + '-' + month + '-' + year;
    }





    toJSON() {
        let dateString = this.publishDate.toISOString();
        let json = {
            "title": this.title,
            "link": this.link,
            "publishDate": dateString,
            "isRead": this.isRead
        };
        return json;
    }
}
