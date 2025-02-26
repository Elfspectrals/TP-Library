export default class Book {
    constructor(title, author, image) {
        this.title = title;
        this.author = author;
        this.image = image || 'Image non disponible';
    }

    getDetails() {
        return `📖 ${this.title} - ✍️ ${this.author}`;
    }
}
