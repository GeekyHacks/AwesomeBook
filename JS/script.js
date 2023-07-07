const main = document.querySelector('main');
const container = document.querySelector('#container');
const dateLine = document.querySelector('.dayDate');
const navBar = document.querySelector('nav');
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

displayBooks = (container) => {
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
};

// Single page app

displayDate = () => {
  const stringDate = new Date();
  const date = stringDate.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = stringDate.toLocaleTimeString();
  dateLine.innerHTML = `${date} ${time}`;
  navBar.appendChild(dateLine);
};

// to update the time
setInterval(displayDate, 1000);

// List page
listpage = () => displayBooks(container);
// addnew page
addBook = () => {
  container.innerHTML = `
  <h2 class="hline">Add New Book</h2>
   
    <form action="" class="bookForm">
      <input required id="title" type="text" placeholder="Title" />
     <input required id="author" type="text" placeholder="Author" />
     <button class="button" id="btn" type="submit">Add</button>
    </form>`;
  main.appendChild(container);
  const addBtn = document.querySelector('#btn');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  // Declare an data object to store userinput
  let formData = {
    Title: '',
    Author: '',
  };

  // Declare the userinput as a data and match it with dataobject
  formUserInput = (data) => {
    titleInput.value = data.Title;
    authorInput.value = data.Author;
  };

  titleInput.addEventListener('input', () => {
    formData.Title = titleInput.value;
    localStorage.setItem('formData', JSON.stringify(formData));
  });

  authorInput.addEventListener('input', () => {
    formData.Author = authorInput.value;
    localStorage.setItem('formData', JSON.stringify(formData));
  });

  // Store all user input one by one
  if (localStorage.getItem('formData')) {
    formData = JSON.parse(localStorage.getItem('formData'));
    formUserInput(formData);
  }

  addBtn.addEventListener('click', (event) => {
    const title = titleInput.value;
    const author = authorInput.value;
    if (title === '' || author === '') {
      return null;
    }

    Book.addBook(title, author);
    localStorage.removeItem('formData');
    titleInput.value = '';
    authorInput.value = '';
    addBook();
    return event.preventDefault();
  });
};

// contact page

contact = () => {
  container.innerHTML = `<h2>Contact Information</h2>
  <h3>Reach out to us whenever you have any question or wanna say 'Hello!'</h3>
  <ul>
    <li>Author:geekyhacks22@gmail.com</li>
    <li>Phone:0032112321</li>
    <li>Adress:Zaid Street, Sana'a, Yemen</li>
  </ul>`;
  main.appendChild(container);
};

// the following can be done for links click

const links = document.querySelectorAll('.link'); /// create array of element objects
links.forEach((link) => {
  link.addEventListener('click', function handleClick() {
    if (this.id === 'listBtn') {
      listpage();
    }
    if (this.id === 'addNewBook') {
      addBook();
    }
    if (this.id === 'contactBtn') {
      contact();
    }
    return link;
  });
});
