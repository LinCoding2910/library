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

addBookToLibrary('Harry Garry', 'Marry', 235, 'finished')

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
    changeStatusOfBook();

    this.reset(); 
    modal.close();
})

function deleteBook() {
    let deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const book = button.parentElement.parentElement;
            const bookTitle = book.firstElementChild.firstElementChild.innerHTML;
            
            book.remove();
            myLibrary = myLibrary.filter(book => book.title !== bookTitle);
        });
    });
}

deleteBook();

function changeStatusOfBook() {
    let changeStatusButtons = document.querySelectorAll('.change-status');

    changeStatusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookTitle = button.parentElement.previousElementSibling.firstElementChild.innerHTML;
            const book = myLibrary.find(book => book.title === bookTitle);

            let bookStatus = button.parentElement.previousElementSibling.lastElementChild;

            if (book.status === 'Not Read') {
                book.status = 'In Progress';
                bookStatus.innerHTML = 'Completion: '+book.status;
            } else if (book.status === 'In Progress') {
                book.status = 'Finished';
                bookStatus.innerHTML = 'Completion: '+book.status;
            } else {
                book.status = 'Not Read';
                bookStatus.innerHTML = 'Completion: '+book.status;
            };
        });
    });
}

changeStatusOfBook();