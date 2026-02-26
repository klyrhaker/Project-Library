const dialog = document.getElementById("my-dialog");
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("open");

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});
let myLibrary = [];
const container = document.getElementById("container");
const form = document.getElementById("form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const elements = form.elements;
  const title = elements.title.value;
  const author = elements.author.value;
  const pages = elements.pages.value;
  const read = elements.read.checked;

  addBookToLibrary(title, author, pages, read);
  dialog.close();
});

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  renderBooks();
}

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    myLibrary = myLibrary.filter((book) => {
      return book.id !== e.target.dataset.id;
    });
    renderBooks();
  }
  if (e.target.classList.contains("read")) {
    for (let i = 0; i < myLibrary.length; i++) {
      const book = myLibrary[i];
      if (e.target.dataset.id === book.id) {
        book.toggleRead();
      }
    }
    renderBooks();
  }
});

function renderBooks() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const div = document.createElement("div");
    const btn = document.createElement("button");

    btn.textContent = "delete";
    btn.classList.add("delete");
    btn.dataset.id = myLibrary[i].id;
    const readBtn = document.createElement("button");
    if (myLibrary[i].read) {
      readBtn.textContent = "прочитано";
    } else if (!myLibrary[i].read) {
      readBtn.textContent = "не прочитано";
    }
    readBtn.classList.add("read");
    readBtn.dataset.id = myLibrary[i].id;

    const book = myLibrary[i];
    for (let key in book) {
      if (key !== "id" && key !== "toggleRead" && key !== "read") {
        console.log(key);
        const p = document.createElement("p");
        p.textContent += ` ${key}: ${book[key]}`;
        div.append(p);
      }
    }
    console.log(btn);
    div.append(readBtn);
    div.append(btn);

    container.append(div);
  }
}
