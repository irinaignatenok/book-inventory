const apiUrl = 'https://book-inventory-x3lc.onrender.com/api/books';
const messageDiv = document.getElementById('message');

let allBooks = []; // Store all books globally for filtering

// Load all Books from the API
function loadBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allBooks = data; // Save all books for filtering
            displayBooks(allBooks); // Display all books
        })
        .catch(error => console.error('Error:', error));
}

// Display Books
function displayBooks(books) {
    const bookList = document.getElementById('books-list');
    bookList.innerHTML = ''; // Clear existing list

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

// Add New Books
document.getElementById('add-book-form').addEventListener('submit', function (e) {
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
        .then(response => response.json())
        .then(data => {
            console.log('Book added:', data);
            loadBooks(); // Reload books after adding
            this.reset(); // Clear form fields
            messageDiv.textContent = 'Books added successfully!';
            messageDiv.style.color = 'green';
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = error.message || 'An error occurred while adding the books.';
            messageDiv.style.color = 'red';
        });
});

// Filter Books
document.getElementById('filter-button').addEventListener('click', function () {
    const filterTitle = document.getElementById('filter-title').value.toLowerCase();
