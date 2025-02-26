import Book from './Book.js';
import Library from './Library.js';

const myLibrary = new Library();

// 🎯 Gestion du formulaire d'ajout de livre
document.getElementById('addBookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    if (title && author) {
        const newBook = new Book(title, author);
        myLibrary.addBook(newBook);
        alert(`📚 Livre ajouté : ${title} par ${author}`);
        document.getElementById('addBookForm').reset();
    } else {
        alert("Veuillez remplir tous les champs !");
    }
});

// 🎯 Afficher la liste des livres
document.getElementById('listBooksBtn').addEventListener('click', () => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    const books = myLibrary.listBooks();
    if (books.length === 0) {
        bookList.innerHTML = '<li>Aucun livre dans la bibliothèque.</li>';
    } else {
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = book;
            bookList.appendChild(li);
        });
    }
});

// 🎯 Rechercher un livre par son titre
document.getElementById('searchBookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTitle = document.getElementById('searchTitle').value.trim();
    const result = myLibrary.findBookByTitle(searchTitle);
    
    document.getElementById('searchResult').textContent = result;
});
