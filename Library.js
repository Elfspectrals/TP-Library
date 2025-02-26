export default class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    listBooks() {
        return this.books;
    }
    findBookByTitle(title) {
        let foundBook = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (foundBook) {
            return foundBook.getDetails();
        } else {
            return 'Livre non trouvé';
        }
    }
}   