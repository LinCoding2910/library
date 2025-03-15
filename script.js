let myLibrary = [];

function Book(index, title, author, pages, status) {
    this.index = index;
    this.title = title
    this.author = author
    this.pages = pages
    if (status === 'finished') {
        this.status = 'Finished'
    } else if (status === 'in-progress') {
        this.status = 'In Progress'
    } else {
        this.status = 'Not Read'
    }
}

const bookList = document.getElementById("booklist");

function displayLibrary() {
    bookList.innerHTML = "";
    myLibrary.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.className = "books";
        bookElement.dataset.index = book.index;
        bookElement.dataset.id = book.title;
        bookElement.dataset.status = book.status;
        bookElement.innerHTML =
            `<div class="book-info">
                <div>${book.title}</div> 
                <div>By: ${book.author}</div> 
                <div>Pages: ${book.pages}</div> 
                <div>Completion: ${book.status}</div> 
            </div>
            <div class="book-options">
            <button class="change-status">Change Status</button>
            <button class="delete">Delete</button>
            </div>`;

        bookList.appendChild(bookElement);
    });

    deleteBook();
    changeStatusOfBook();
}

function addBookToLibrary(title, author, pages, status) {
    const index = myLibrary.length;  
    const newBook = new Book(index, title, author, pages, status);
    myLibrary.push(newBook);
    displayLibrary();
}

addBookToLibrary('Harry Garry', 'Marry', 235, 'finished');
addBookToLibrary('Harry Garry', 'Marry', 235, 'finished');
addBookToLibrary('Harry Garry', 'Marry', 235, 'finished');
addBookToLibrary('Kirby Quirky', 'Picky', 9, 'not-read');

const openModal = document.getElementById("open-button");
const modal = document.getElementById("modal");
const form = document.getElementById('form');

openModal.addEventListener('click', () => {
    modal.showModal();
})

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let status = formData.get('status');

    addBookToLibrary(title, author, pages, status);

    this.reset(); 
    modal.close();
})

function deleteBook() {
    let deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookElement = button.parentElement.parentElement;
            const book = myLibrary[bookElement.dataset.index];

            myLibrary.splice(book.index, 1);
            updateIndexes();
            displayLibrary();
        });
    });
}

function changeStatusOfBook() {
    let changeStatusButtons = document.querySelectorAll('.change-status');

    changeStatusButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // const bookTitle = button.parentElement.previousElementSibling.firstElementChild.innerHTML;
            const bookElement = button.parentElement.parentElement; 
            const book = myLibrary[bookElement.dataset.index];

            if (book.status === 'Not Read') {
                book.status = 'In Progress';
            } else if (book.status === 'In Progress') {
                book.status = 'Finished';
            } else {
                book.status = 'Not Read';
            };

            displayLibrary();
        });
    });
}

function updateIndexes () {
    myLibrary.forEach((book, i) => {
        book.index = i;

        const bookElement = document.querySelector(`[data-id="${book.title}]`);
        if (bookElement) {
            bookElement.dataset.index = i;
        };
    });
}