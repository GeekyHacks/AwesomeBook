const container = document.querySelector('#container');
const dateLine = document.querySelector('.dayDate');
const navBar = document.querySelector('nav');
const contactPage = document.querySelector('#contactUs');
const contactBtn = document.querySelector('#contactBtn');
const addBookSection = document.querySelector('#addBooks');
const addNewBookBtn = document.querySelector('#addNewBook');
const listBtn = document.querySelector('#listBtn');
let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook(title, author) {
    const newBook = new Book(title, author);
    bookCollection.unshift(newBook);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }

  static removeBook(book) {
    bookCollection = bookCollection.filter((b) => b !== book);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
}

class ShowBooks {
  constructor(container) {
    this.container = container;
  }

  static displayBooks(container) {
    container.innerHTML = '';
    bookCollection.forEach((book) => {
      const newBook = document.createElement('div');
      newBook.classList.add('newBook');
      newBook.innerHTML = `<div class="bookPart"><p>${book.title} <span>by</span> ${book.author} </p>
                               </div><button class="remove">Remove</button>`;
      container.appendChild(newBook);

      const removeBtn = newBook.querySelector('.remove');
      removeBtn.addEventListener('click', () => {
        Book.removeBook(book);
        newBook.remove();
      });
    });
  }
}

// Single page app

function displayDate() {
  const stringDate = new Date();
  const date = stringDate.toLocaleDateString('en-us', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  // const date = stringDate.toLocaleDateString();
  const time = stringDate.toLocaleTimeString();
  dateLine.innerHTML = `${date} ${time}`;
  navBar.appendChild(dateLine);
}

// to update the time
setInterval(displayDate, 1000);

// to add th sd

function onLoad() {
  displayDate();
  container.classList.add('hide');
  contactPage.classList.add('hide');
  addBookSection.classList.add('hide');
}
onLoad();
// List page
function listpage() {
  container.classList.remove('hide');
  contactPage.classList.add('hide');
  addBookSection.classList.add('hide');
  ShowBooks.displayBooks(container);
}

// addnew page
function addBook() {
  addBookSection.classList.remove('hide');
  contactPage.classList.add('hide');
  container.classList.add('hide');
  addBookSection.innerHTML = `
  <h2 class="hline">Add New Book</h2>
   
    <form action="" class="bookForm">
      <input id="title" type="text" placeholder="Title" />
     <input id="author" type="text" placeholder="Author" />
     <button class="button" id="btn" type="submit">Add</button>
    </form>`;
  const addBtn = document.querySelector('#btn');

  addBtn.addEventListener('click', (event) => {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const title = titleInput.value;
    const author = authorInput.value;
    if (title === '' || author === '') {
      return null;
    }
    Book.addBook(title, author);
    ShowBooks.displayBooks(container);

    titleInput.value = '';
    authorInput.value = '';
    return event.preventDefault();
  });
  // mainContainer.appendChild(container);
}

// contact page

function contact() {
  contactPage.classList.remove('hide');
  container.classList.add('hide');
  addBookSection.classList.add('hide');
  contactPage.innerHTML = `<h2>Contact Information</h2>
  <h3>Reach out to us whenever you have any question or wanna say 'Hello!'</h3>
  <ul id="contactList">
    <li>Email:geekyhacks22@gmail.com</li>
    <li>Phone:0032112321</li>
    <li>Adress:Zaid Street, Sana'a, Yemen</li>
  </ul>`;
}
listBtn.addEventListener('click', () => {
  listpage();
});
addNewBookBtn.addEventListener('click', () => {
  addBook();
});
contactBtn.addEventListener('click', () => {
  contact();
});
