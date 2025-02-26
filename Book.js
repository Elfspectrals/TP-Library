export default class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    getDetails() {
        return `📖 ${this.title} - ✍️ ${this.author}`;
    }
}
