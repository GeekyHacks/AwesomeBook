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
      //                           <button class="remove">Remove</button></div>`;
      container.appendChild(newBook);

      const removeBtn = newBook.querySelector('.remove');
      removeBtn.addEventListener('click', () => {
        Book.removeBook(book);
        newBook.remove();
      });
    });
  }
}

ShowBooks.displayBooks(container);

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

