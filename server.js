const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: '7Bbz8nJ9vUj-',
        database: 'movie_db'
    },
    console.log(`Connected to the database.`)
);



app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', function (error, results) {
        res.json(results);
    });
});

// POST request for reviews
app.post('/api/add-movie', (req, res) => {
    // Inform the client that their POST request was received
    res.json(`${req.method} request received to add a review`);
    // Log our request to the terminal
    console.info(`${req.method} request received to add a review`);
    db.query('INSERT INTO movies (movie_name, movie_year) VALUES (?, ?)', [req.body.movie_name, req.body.movie_year], function (error, results) {
        res.json(results);
    });

});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Query database

/*let deletedRow = 2;

db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// Query database
db.query('SELECT * FROM favorite_books', function (err, results) {
    console.log(results);
});

db.query('SELECT * FROM favorite_books WHERE id = 3', function (err, results) {
    console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
