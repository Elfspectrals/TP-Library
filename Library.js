export default class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    listBooks() {
        return this.books.map(book => book.getDetails());
    }

    findBookByTitle(title) {
        const foundBook = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        return foundBook ? foundBook.getDetails() : '❌ Livre non trouvé';
    }
}
