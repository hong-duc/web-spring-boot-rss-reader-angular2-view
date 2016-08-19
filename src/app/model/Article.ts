export class Article {
    private title: string;
    private link: string;
    private publishDate: Date;
    private dateToString: string;

	public get $title(): string {
		return this.title;
	}

	public set $title(value: string) {
		this.title = value;
	}

	public get $link(): string {
		return this.link;
	}

	public set $link(value: string) {
		this.link = value;
	}

	public get $publishDate(): Date {
		return this.publishDate;
	}

	public set $publishDate(value: Date) {
		this.publishDate = value;
	}

    public get $dateToString(): string{
        return 'formatted date';
    }

    public set $dateToString(value: string){
    	this.dateToString = value;
    }
    




    toJSON() {
        let dateString = this.publishDate.toISOString();
        let json = [
            '{"title":' + '"' + this.title + '"',
            '"link":' + '"' + this.link + '"',
            '"date":' + '"' + dateString + '"}'
        ];

        let json2 = json.join(',');
        return json2;
    }
}
