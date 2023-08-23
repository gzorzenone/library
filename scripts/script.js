class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    if(this.read === "yes") {
      this.read = "no";
    }
    else {
      this.read = "yes";
    }
  }
}

function addBookToLibrary() {
  let bookTitle = document.querySelector("#book_title").value;
  let bookAuthor = document.querySelector("#book_author").value;
  let bookPages = document.querySelector("#book_pages").value;
  let bookRead = document.querySelector("#book_read").value;

  let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(book);
}

function displayBooks() {
  const cards = document.querySelector(".cards");

  cards.replaceChildren();

  myLibrary.forEach(function(book, index) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = `Title: ${book.title}`;
    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = `Author: ${book.author}`;
    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `Pages: ${book.pages}`;
    const read = document.createElement("div");
    read.classList.add("read");
    read.textContent = `Read: ${book.read}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-index-number", index);
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(deleteBtn.dataset.indexNumber, 1);
      displayBooks();
    });

    const readBtn = document.createElement("button");
    readBtn.setAttribute("data-index-number", index);
    readBtn.textContent = "Toggle read";
    readBtn.addEventListener("click", () => {
      book.toggleRead();
      read.textContent = `Read: ${book.read}`;
    });
  
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(deleteBtn);
    card.appendChild(readBtn);
    cards.appendChild(card);
  });
}

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, "no"),
];

const addBtn = document.querySelector("#add_btn");
const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector("#confirm_btn");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  dialog.close();
});

displayBooks();