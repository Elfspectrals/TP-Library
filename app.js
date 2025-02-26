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
document.getElementById('listBooksBtn').addEventListener('click', displayBooks);

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    const books = myLibrary.listBooks();
    if (books.length === 0) {
        bookList.innerHTML = '<li>Aucun livre dans la bibliothèque.</li>';
    } else {
        books.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p>${book.getDetails()}</p>
                <img src="${book.image}" alt="Image du livre" style="width: 100px; height: auto;">
            `;
            bookList.appendChild(li);
        });
    }
}

// 🎯 Rechercher un livre par son titre
document.getElementById('searchBookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTitle = document.getElementById('searchTitle').value.trim();
    const result = myLibrary.findBookByTitle(searchTitle);
    
    document.getElementById('searchResult').textContent = result;
});

// 🎯 Fonction pour récupérer un livre depuis l'API Google Books
function fetchApiBook() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=javascript')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.items && data.items.length > 0) {
                const firstBook = data.items[0].volumeInfo;
                const title = firstBook.title || 'Titre inconnu';
                const author = firstBook.authors ? firstBook.authors[0] : 'Auteur inconnu';
                const image = firstBook.imageLinks ? firstBook.imageLinks.thumbnail : 'https://via.placeholder.com/100';

                console.log(`Titre: ${title}`);
                console.log(`Auteur: ${author}`);
                console.log(`Image: ${image}`);

                const book = new Book(title, author, image);
                myLibrary.addBook(book);
                displayBooks();
            } else {
                console.log('No books found.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Lancer la récupération d’un livre lors du chargement de la page
fetchApiBook();
