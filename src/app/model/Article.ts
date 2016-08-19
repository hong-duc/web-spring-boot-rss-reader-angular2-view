export class Article {
    title: string;
    link: string;
    publishDate: Date;


    constructor(obj: Article) {
        this.title = obj.title;
        this.link = obj.link;
        this.publishDate = obj.publishDate;
    }


    public getDate(): string {
        let date = this.publishDate.getDate();
        let month = this.publishDate.getMonth();
        let year = this.publishDate.getFullYear();
        return date + '-' + month + '-' + year;
    }





    toJSON() {
        let dateString = this.publishDate.toISOString();
        let json = {
            "title": this.title,
            "link": this.link,
            "publishDate": dateString
        };
        return json;
    }
}
