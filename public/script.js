const apiUrl = 'http://localhost:3000/api/books';
const messageDiv = document.getElementById('message');

// Add new book
let bookForm = document.getElementById('add-book-form');
bookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        publicationDate: document.getElementById('publication_date').value,
        isbn: document.getElementById('isbn').value,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
    })
        .then(response => {
            if (!response.ok) {
                // If the response is not ok, return the error message from the server
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Book added:', data);
            loadBooks();
            bookForm.reset();
            // Show a success message
            messageDiv.textContent = 'Book added successfully!';
            messageDiv.style.color = 'green';
        })
        .catch(error => {
            console.error('Error:', error.message);

            // Show the error message
            messageDiv.textContent = error.message || 'An error occurred while adding the book.';
            messageDiv.style.color = 'red';
        });
});

// Load all Books
function loadBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data);
        })
        .catch(error => console.error('Error:', error));
}

// Display Books
function displayBooks(books) {
    const bookList = document.getElementById('books-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const line = document.createElement('li');
        line.classList.add('book-card');

        line.innerHTML = `
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-genre">Genre: ${book.genre}</p>
            <p class="book-publication-date">Published on: ${book.publicationDate}</p>
            <p class="book-isbn">ISBN: ${book.isbn}</p>
        `;

        bookList.appendChild(line);
    });
}

loadBooks();

// Export Books JSON
function exportBooksJSON() {
    fetch('http://localhost:3000/api/books/export/json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'books_inventory.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Show a success message
            messageDiv.textContent = 'Books exported successfully!';
            messageDiv.style.color = 'green';
        })
        .catch(error => {
            console.error('Error exporting JSON:', error);

            // Show the error message
            messageDiv.textContent = error.message || 'An error occurred while exporting the books.';
            messageDiv.style.color = 'red';
        });
}

document.getElementById('export-json-button').addEventListener('click', exportBooksJSON);
