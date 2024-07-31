let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

// Method to find a review by ISBN and username
function findReviewByISBNAndUsername(isbn, username) {
      if (books[isbn] && books[isbn].reviews[username]) {
        return books[isbn].reviews[username];
      }
      return null;
    }
    
    // Method to add or update a review by ISBN and username
    function addReviewByISBNAndUsername(isbn, username, review) {
      if (books[isbn]) {
        books[isbn].reviews[username] = { username, review };
      }
    }
    
    // Method to delete a review by ISBN and username
    function deleteReviewByISBNAndUsername(isbn, username) {
      if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
      }
    }
    
    module.exports = { books, findReviewByISBNAndUsername, addReviewByISBNAndUsername, deleteReviewByISBNAndUsername };
