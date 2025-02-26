import Book from './Book.js';
import Library from './Library.js';
const LOTR = new Book('Le Seigneur des Anneaux', 'J.R.R. Tolkien');
const HP = new Book('Harry Potter', 'J.K. Rowling');

const Alexandrie = new Library();
Alexandrie.addBook(LOTR);
Alexandrie.addBook(HP);

