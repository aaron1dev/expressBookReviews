const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
      // Send JSON response with formatted friends data
      return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn;
    
    if(isbn)
    {
        let book = books[ parseInt(isbn) ];
        if(book)
        {
            return res.send(JSON.stringify(book,null,4));
        }
    }

    return res.status(404).json({message: "Book not found "});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    let author = req.params.author;
    if(author)
    {
        let hisBooks = [];
        
        Object.keys(books)
            .filter((k) => books[k].author == author)
            .forEach(k => hisBooks.push(books[k]));

        return res.send(JSON.stringify(hisBooks,null,4));
    }
  
  return res.status(404).json({message: "Author not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    let title = req.params.title;
    if(title)
    {
        let book = [];

        Object.keys(books)
            .filter((k) => books[k].title == title)
            .forEach(k => book.push(books[k]));

        return res.send(JSON.stringify(book,null,4));
    }

    return res.status(404).json({message: "Title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
    
    if(isbn)
    {
        return res.send(JSON.stringify(books[isbn].reviews,null,4));
    }

    return res.status(404).json({message: "Book not found "});
});

module.exports.general = public_users;
