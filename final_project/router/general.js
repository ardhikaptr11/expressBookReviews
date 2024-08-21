const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	//Write your code here
	return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	//Write your code here
	return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	//Write your code here
	const ISBN = req.params.isbn;

	if (books[ISBN]) {
		return res.send(books[ISBN]);
	} else {
		return res.status(403).json({ message: "Book not found" });
	}
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	//Write your code here
	const author = req.params.author;
	const matchedBook = {};

	for (let ISBN in books) {
		if (books[ISBN].author === author) {
			matchedBook[ISBN] = books[ISBN];
		}
	}

	if (Object.keys(matchedBook).length === 0) {
		res.status(403).json({ message: "Author not found" });
	}
	res.send(matchedBook);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	//Write your code here
	const title = req.params.title;

	const matchedBook = {};

	for (let ISBN in books) {
		if (books[ISBN].title === title) {
			matchedBook[ISBN] = books[ISBN];
		}
	}

	if (Object.keys(matchedBook).length === 0) {
		res.status(403).json({ message: "Title not found" });
	}
	res.send(matchedBook);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	//Write your code here
	const ISBN = req.params.isbn;

	if (books[ISBN]) {
		res.send(books[ISBN].reviews);
	}
	res.status(403).json({ message: "Book not found" });
});

module.exports.general = public_users;
