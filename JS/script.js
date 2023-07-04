const container = document.getElementById('container');
const addBtn = document.getElementById('btn');
let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  ShowBooks() {
    const removeBook = (book) => {
      bookCollection = bookCollection.filter((b) => b !== book);
      localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    };
    const displayBooks = (container) => {
      container.innerHTML = '';
      bookCollection.forEach((book) => {
        const newBook = document.createElement('div');
        newBook.classList.add('newBook');
        newBook.innerHTML = `<div class="bookPart"><p>${book.title} <span>by</span> ${book.author} </p>
                                <button class="remove">Remove</button></div>`;
        container.appendChild(newBook);

        const removeBtn = newBook.querySelector('.remove');
        removeBtn.addEventListener('click', () => {
          removeBook(book);
          newBook.remove();
        });
      });
    };
    displayBooks(container);
    const addBook = (title, author) => {
      const newBook = { title, author };
      bookCollection.unshift(newBook);
      container.style.display = 'flex';
      localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    };
  }
}

addBtn.addEventListener('click', (event) => {
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const title = titleInput.value;
  const author = authorInput.value;

  if (title === '' || author === '') {
    return false;
  }
  Books.ShowBooks().addBook(title, author);
  Books.ShowBooks.displayBooks(container);
  titleInput.value = '';
  authorInput.value = '';
});

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
