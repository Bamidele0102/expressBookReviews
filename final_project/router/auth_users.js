const express = require('express');
const jwt = require('jsonwebtoken');
const { findReviewByISBNAndUsername, addReviewByISBNAndUsername, deleteReviewByISBNAndUsername } = require("./booksdb.js");const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  // Filter the users array for any user with the same username
  let user = users.filter((user) => user.username === username);
  // Return true if the user exists, false otherwise
  return user.length > 0;
}

const authenticatedUser = (username,password)=>{
  let validUsers = users.filter((user) => user.username === username && user.password === password);
  // Return true if any valid user is found, otherwise false
  if (validUsers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body;

  // Check if the username and password match the records
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (!isValid(username)) {
    return res.status(404).json({message: "User not found"});
  }
  if (authenticatedUser(username, password)) {
    // Create a JWT token for the user
    let accessToken = jwt.sign({data: password}, 'access', { expiresIn: '1h' }); // 1 hour
    // Store access token and username in session
    req.session.authorization = {
      "accessToken": accessToken,
      "username": username
    }
    return res.status(200).json({message: "User successfully logged in"});
  } else {
    return res.status(403).json({message: "Invalid Login. Check username or password"});
  }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const { username } = req.session.authorization;

  if (!isbn || !review) {
    return res.status(400).json({message: "ISBN and review are required"});
  }

  // Check if the user has already reviewed the book
  const existingReview = findReviewByISBNAndUsername(isbn, username);

  if (existingReview) {
    // Update the existing review
    addReviewByISBNAndUsername(isbn, username, review);
    return res.status(200).json({message: "Review updated successfully"});
  } else {
    // Add a new review
    addReviewByISBNAndUsername(isbn, username, review);
    return res.status(201).json({message: "Review added successfully"});
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username } = req.session.authorization;

  if (!isbn) {
    return res.status(400).json({message: "ISBN is required"});
  }

  // Check if the user has already reviewed the book
  const existingReview = findReviewByISBNAndUsername(isbn, username);

  if (existingReview) {
    // Delete the existing review
    deleteReviewByISBNAndUsername(isbn, username);
    return res.status(200).json({message: "Review deleted successfully"});
  } else {
    return res.status(404).json({message: "Review not found"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
