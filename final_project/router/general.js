const express = require("express");

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	//Write your code here
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (!isValid(username)) {
			users.push({ username: username, password: password });
			return res
				.status(200)
				.json({ message: "User successfully registered. Now you can login!" });
		}
		return res.status(404).json({ message: "User already exists!" });
	}
	return res.status(404).json({ message: "Unable to register user" });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
	try {
		const fetchedBooks = await new Promise((resolve, reject) => {
			setTimeout(() => {
				if (books) {
					resolve(books);
				} else {
					reject("An error occurred while fetching the books.");
				}
			}, 1000);
		});
		return res.send(books);
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
	//Write your code here
	const ISBN = req.params.isbn;
	try {
		const bookByISBN = await new Promise((resolve, reject) => {
			setTimeout(() => {
				if (books[ISBN]) {
					resolve(books[ISBN]);
				} else {
					reject("Book not found");
				}
			}, 1000);
		});
		return res.send(bookByISBN);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
	//Write your code here
	const author = req.params.author;
	const matchedBook = {};

	try {
		const bookByAuthor = await new Promise((resolve, reject) => {
			setTimeout(() => {
				for (let ISBN in books) {
					if (books[ISBN].author === author) {
						matchedBook[ISBN] = books[ISBN];
						resolve(matchedBook);
						return res.send(matchedBook);
					}
				}
				if (Object.keys(matchedBook).length === 0) {
					reject("Author not found");
				}
			}, 1000);
		});
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
	//Write your code here
	const title = req.params.title;
	const matchedBook = {};

	try {
		const bookByTitle = await new Promise((resolve, reject) => {
			setTimeout(() => {
				for (let ISBN in books) {
					if (books[ISBN].title === title) {
						matchedBook[ISBN] = books[ISBN];
						resolve(matchedBook);
						return res.send(matchedBook);
					}
				}
				if (Object.keys(matchedBook).length === 0) {
					reject("Title not found");
				}
			}, 1000);
		});
	} catch (error) {
		return res.status(404).json({ message: error });
	}
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
