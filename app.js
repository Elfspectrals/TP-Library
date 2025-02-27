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

// 🎨 Générer une couleur unique pour chaque livre en fonction de son titre
function generateBackgroundColor(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 80%)`; // Palette pastel dynamique
    return color;
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

            const backgroundColor = generateBackgroundColor(book.title);

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

          <rect
            x="0"
            y="0"
            width="210"
            height="297"
            fill="url(#oldPaperGradient)"
          />

          <rect
            x="10"
            y="10"
            width="190"
            height="277"
            fill="${backgroundColor}"
            stroke="#5c3d12"
            stroke-width="3"
          />

          <!-- ✅ Ajout du fond derrière l'image -->
          <rect
            x="35"
            y="75"
            width="140"
            height="100"
            rx="10"
            ry="10"
            fill="${backgroundColor}"
          />

          <!-- 📖 Image de couverture -->
          <image
            xlink:href="${book.image}"
            x="50%"
            y="35%"
            width="140"
            height="100"
            transform="translate(-70, -50)"
            preserveAspectRatio="xMidYMid meet"
          />

          <!-- 📌 Titre principal -->
          <text
            x="50%"
            y="95%"
            text-anchor="middle"
            font-size="32"
            font-family="Georgia, serif"
            fill="#5c3d12"
            style="font-weight: bold;"
          >
            ${truncateText(book.title, 15)}
          </text>

          <!-- ✒️ Auteur -->
          <text
            x="50%"
            y="120%"
            text-anchor="middle"
            font-size="22"
            font-family="Georgia, serif"
            fill="#5c3d12"
          >
            ${book.author.split(' ')[0].charAt(0)}.${book.author.split(' ').slice(1).join(' ')}
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

    document.getElementById('searchResult').textContent = result ? `📖 ${result.title} par ${result.author}` : "❌ Livre non trouvé";
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
                    const image = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/100';

                    // 📖 On suppose que la classe Book accepte un 3e argument pour l'image
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

// Lancer la récupération d’un livre lors du chargement de la page
fetchApiBook();
