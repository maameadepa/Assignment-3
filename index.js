const express = require('express');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

//Logging middleware
app.use((req, res, next) => {
    console.log('${req.method} ${req.url}');
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Library API',
        endpoints: {
            'GET /books': 'Get all books',
            'GET /books/:id': 'Get a specific book',
            'POST /books': 'Add a new book',
            'PUT /books/:id': 'Update a book',
            'DELETE /books/:id': 'Delete a book'
        }
    });
});


let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        year: 1949
    },
    {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960
    }
];
let nextId = 4;

//Validation middleware
const validateBook = (req, res, next) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ 
            error: 'All fields (title, author, year) are required' 
        });
    }

    next();
};

// GET books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET books by id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if (!book) {
        return res.status(404).send('Book not found.');
    } 
    res.json(book);
});

// Add a new book
app.post('/books', validateBook, (req, res) => {
    const book = {
        id: nextId++,
        ...req.body
    };
    books.push(book);
    res.status(201).json(book);
});

//Update books
app.put('/books/:id', validateBook, (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books[index] = {
        ...books[index],
        ...req.body,
        id: parseInt(req.params.id)
    };
    
    res.json(books[index]);
});

// DELETE books
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books.splice(index, 1);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});