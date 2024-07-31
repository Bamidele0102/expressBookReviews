const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Get the book list available in the shop: Task 6
public_users.post("/register", (req,res) => {
  const {username, password} = req.body;
  // Check if the username is already taken, if not, add the user to the 'users' array
  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(201).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(400).json({message: "Username and password are required"});
});

// Get the book list available in the shop: Task 1
public_users.get('/', async function (req, res) {
  try {
    // Send a JSON response with the list of books formatted with an indent of 4 spaces
    const bookList = await new Promise((resolve, reject) => {
      res.send(JSON.stringify({books}, null, 4));
    });
    return res.status(200).json(bookList);
  } catch (error) {
    // Handle the error by sending an error response
    res.status(500).json({message: "Error retrieving book list"});
  }
});

// Get book details based on ISBN- Task 2
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const book = await new Promise((resolve, reject) => {
      if (books.hasOwnProperty(isbn)) {
        resolve(books[isbn]);
      } else {
        reject({message: "Book not found"});
      }
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get book details based on author: Task 3
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const matchingBooks = await new Promise((resolve, reject) => {
      const bookKeys = Object.keys(books);
      const matchingBooks = [];
      for (let i = 0; i < bookKeys.length; i++) {
        const isbn = bookKeys[i];
        if (books[isbn].author === author) {
          matchingBooks.push(books[isbn]);
        }
      }
      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject({message: "No books found for the author"});
      }
    });
    return res.status(200).json(matchingBooks);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get the book list available in the shop: Task 4
// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const matchingBooks = await new Promise((resolve, reject) => {
      let matchingBooks = [];

      // Iterate through the 'books' object and check if the title matches the one provided in the request parameters
      for (const isbn in books) {
        if (books[isbn].title === title) {
          matchingBooks.push(books[isbn]);
        }
      }

      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject({message: "No books found for the title"});
      }
    });
    return res.status(200).json(matchingBooks);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// Get the book list available in the shop: Task 5
// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  // Check if the book with the provided ISBN exists in the 'books' object
  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    // Check if the book has reviews
    if (book.hasOwnProperty('reviews')) {
      const reviews = book.reviews;
      return res.status(200).json(reviews);
    } else {
      return res.status(404).json({message: "No reviews found for the book"});
    }
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
