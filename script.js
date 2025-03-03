let myLibrary = [];

function Book(title, author, pages, status) {
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
    bookList.innerHTML = myLibrary
        .map(book => 
            `<div class='book'>
                <div class='book-info'>
                    <div>${book.title}</div>
                    <div>${'By: '+book.author}</div>
                    <div>${'Pages: '+book.pages}</div>
                    <div>${'Completion: '+book.status}</div>
                </div> 
                <div class='book-options'>
                    <button class='change-status'>Change Status</button>
                    <button class='delete'>Delete</button>
                </div>               
            </div>`)
        .join("");
}

function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    displayLibrary();
}

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

    deleteBook();

    this.reset(); 
    modal.close();
})

function deleteBook() {
    let deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const book = button.parentElement.parentElement;
            book.remove();

            const bookTitle = button.parentElement.previousElementSibling.firstElementChild.innerHTML;
            myLibrary = myLibrary.filter(book => book.title !== bookTitle);
        });
    });
}

deleteBook();