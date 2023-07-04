const container = document.querySelector('#container');
const addBtn = document.querySelector('#btn');

let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook(title, author) {
    const newBook = new Book(title, author);
    bookCollection.push(newBook);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }

  static removeBook(book) {
    bookCollection = bookCollection.filter((b) => b !== book);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
}

// const displayBooks = (container) => {
//   container.innerHTML = '';
//   bookCollection.forEach((book) => {
//     const newBook = document.createElement('div');
//     newBook.classList.add('newBook');
//     newBook.innerHTML = `<p>${book.title} by ${book.author}</p><button class="remove">Remove</button>`;
//     container.appendChild(newBook);

//     const removeBtn = newBook.querySelector('.remove');
//     removeBtn.addEventListener('click', () => {
//       Book.removeBook(book);
//       newBook.remove();
//     });
//   });
// };

// displayBooks(container);

// addBtn.addEventListener('click', (event) => {
//   event.preventDefault();
//   const titleInput = document.querySelector('#title');
//   const authorInput = document.querySelector('#author');
//   const title = titleInput.value;
//   const author = authorInput.value;

//   Book.addBook(title, author);
//   displayBooks(container);

//   titleInput.value = '';
//   authorInput.value = '';
// });

///////////////////////////////////////////////////////////////////////////
// const container = document.getElementById('container');
// const addBtn = document.getElementById('btn');

// let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

// const removeBook = (book) => {
//   bookCollection = bookCollection.filter((b) => b !== book);
//   localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
// };
// const displayBooks = (container) => {
//   container.innerHTML = '';
//   bookCollection.forEach((book) => {
//     const newBook = document.createElement('div');
//     newBook.classList.add('newBook');
//     newBook.innerHTML = `<div class="bookPart"><p>${book.title} <span>by</span> ${book.author} </p>
//                           <button class="remove">Remove</button></div>`;
//     container.appendChild(newBook);

//     const removeBtn = newBook.querySelector('.remove');
//     removeBtn.addEventListener('click', () => {
//       removeBook(book);
//       newBook.remove();
//     });
//   });
// };
// displayBooks(container);
// const addBook = (title, author) => {
//   const newBook = { title, author };
//   bookCollection.unshift(newBook);
//   container.style.display = 'flex';
//   localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
// };

// addBtn.addEventListener('click', (event) => {
//   const titleInput = document.querySelector('#title');
//   const authorInput = document.querySelector('#author');
//   const title = titleInput.value;
//   const author = authorInput.value;

//   if (title === '' || author === '') {
//     return false;
//   }
//   addBook(title, author);
//   displayBooks(container);
//   titleInput.value = '';
//   authorInput.value = '';
// });
