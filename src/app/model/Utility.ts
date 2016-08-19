export class Utility {
    /**
     * chuyển từ json sang Feed
     */
    static parseJsonToFeed(key: any, value: any) {
        // console.log('key: ' + key);
        // console.log('value: ' + value);
        if (key === 'publishDate') {
            let date = new Date(value);
            return date;
        }
        return value;
    }
}
