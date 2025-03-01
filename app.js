// On importe les classes depuis le script directement dans l’exemple
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
        displayBooks();
    } else {
        alert("Veuillez remplir tous les champs !");
    }
});

document.getElementById('listBooksBtn').addEventListener('click', displayBooks);

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "…" : text;
}


function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    const books = myLibrary.listBooks();
    if (books.length === 0) {
        bookList.innerHTML = '<li>Aucun livre dans la bibliothèque.</li>';
    } else {
        books.forEach(book => {
            const divBook = document.createElement('div');
            divBook.classList.add('bookDisplay');

            divBook.innerHTML = `
                <svg
                  width="100%"
                  viewBox="0 0 210 297"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <radialGradient id="oldPaperGradient" cx="50%" cy="50%" r="80%">
                      <stop offset="0%" stop-color="#f8ecc2" />
                      <stop offset="100%" stop-color="#c6ae82" />
                    </radialGradient>
                  </defs>

                  <!-- Fond “vieux papier” (optionnel) -->
                  <rect
                    x="0"
                    y="0"
                    width="210"
                    height="297"
                  />

                  <!-- Image en pleine taille -->
                  <image
                    xlink:href="${book.image}"
                    x="0"
                    y="0"
                    width="210"
                    height="297"
                    preserveAspectRatio="xMidYMid slice"
                  />

                  <!-- Background rectangle for the text -->
                  <rect 
                    x="0"
                    y="250"
                    height="30"
                    width="210"
                    fill="#756b6b"
                    style="opacity: 0.7;"
                  />

                  <!-- Titre du livre, en bas -->
                  <text
                    x="50%"
                    y="395"
                    dy="-10"
                    text-anchor="middle"
                    font-size="32"
                    font-family="Georgia, serif"
                    fill="#ffffff"
                  >
                    ${truncateText(book.title, 20)}
                  </text>

                  <!-- Auteur du livre, en bas (sous le titre) -->
                  <text
                    x="50%"
                    y="270"
                    dy="10"
                    text-anchor="middle"
                    font-size="12"
                    font-family="Georgia, serif"
                    fill="#ffffff"
                    style="text-shadow: 1px 1px 2px #000;"
                  >
                    ${book.author}
                  </text>
                </svg>
            `;

            bookList.appendChild(divBook);
        });
    }
}

document.getElementById('searchBookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTitle = document.getElementById('searchTitle').value.trim();
    const result = myLibrary.findBookByTitle(searchTitle);

    document.getElementById('searchResult').textContent = result
        ? `📖 ${result.title} par ${result.author}`
        : "❌ Livre non trouvé";
});

// 🎯 Récupération de livres depuis l’API Google Books
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
                data.items.forEach(item => {
                    const bookInfo = item.volumeInfo;
                    const title = bookInfo.title || 'Titre inconnu';
                    const author = bookInfo.authors ? bookInfo.authors[0] : 'Auteur inconnu';
                    const image = bookInfo.imageLinks
                        ? bookInfo.imageLinks.thumbnail
                        : 'https://via.placeholder.com/210x297';

                    // On crée le livre avec un 3e argument pour l'image
                    const book = new Book(title, author, image);
                    myLibrary.addBook(book);
                });
                displayBooks();
            } else {
                console.log('No books found.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Lancement de la récupération d’un livre par défaut
fetchApiBook();
