// // server/routes.js
// const express = require('express');
// const db = require('./database');
// const router = express.Router();

// // Add a new book
// router.post('/books', (req, res) => {
//     const { title, author, genre, publicationDate, isbn } = req.body;
//     console.log('Received Data:', req.body);

//     const query = `INSERT INTO Inventory (title, author, genre, publicationDate, isbn) VALUES (?, ?, ?, ?, ?)`;
//     db.run(query, [title, author, genre, publicationDate, isbn], function (err) {
//         if (err) {
//             console.error('Database Error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }
//         console.log(`Book added with ID: ${this.lastID}`);
//         res.status(201).json({ id: this.lastID });
//     });
// });


// // Filter books
// router.get('/books', (req, res) => {
//     const { title, author, genre } = req.query;
//     let query = `SELECT * FROM Inventory WHERE 1=1`;
//     const params = [];

//     if (title) {
//         query += ` AND title LIKE ?`;
//         params.push(`%${title}%`);
//     }
//     if (author) {
//         query += ` AND author LIKE ?`;
//         params.push(`%${author}%`);
//     }
//     if (genre) {
//         query += ` AND genre LIKE ?`;
//         params.push(`%${genre}%`);
//     }

//     console.log('Query:', query);
//     console.log('Params:', params);

//     db.all(query, params, (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(rows);
//     });
// });


// // Export book JSON

// router.get('/books/export/json', (req, res) => {
//     console.log('Export JSON route accessed');
//     db.all(`SELECT * FROM Inventory`, [], (err, rows) => {
//         if (err) {
//             console.error('Database Error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }

//         console.log('Books fetched for export:', rows.length);
//         res.header('Content-Type', 'application/json');
//         res.attachment('books_inventory.json');
//         res.send(JSON.stringify(rows, null, 2));
//     });
// })

// module.exports = router;

// server/routes.js
const express = require('express');
const db = require('./database'); // Ensure this is set up with `pg` correctly
const router = express.Router();

// Add a new book
router.post('/books', async (req, res) => {
    const { title, author, genre, publicationDate, isbn } = req.body;
    console.log('Received Data:', req.body);

    const query = `
        INSERT INTO Inventory (title, author, genre, publicationDate, isbn)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;

    try {
        const result = await db.query(query, [title, author, genre, publicationDate, isbn]);
        console.log(`Book added with ID: ${result.rows[0].id}`);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Database Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Filter books
router.get('/books', async (req, res) => {
    const { title, author, genre } = req.query;
    let query = `SELECT * FROM Inventory WHERE 1=1`;
    const params = [];

    if (title) {
        query += ` AND title ILIKE $${params.length + 1}`;
        params.push(`%${title}%`);
    }
    if (author) {
        query += ` AND author ILIKE $${params.length + 1}`;
        params.push(`%${author}%`);
    }
    if (genre) {
        query += ` AND genre ILIKE $${params.length + 1}`;
        params.push(`%${genre}%`);
    }

    console.log('Query:', query);
    console.log('Params:', params);

    try {
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Database Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Export book JSON
router.get('/books/export/json', async (req, res) => {
    console.log('Export JSON route accessed');
    try {
        const result = await db.query(`SELECT * FROM Inventory`);
        console.log('Books fetched for export:', result.rows.length);
        res.header('Content-Type', 'application/json');
        res.attachment('books_inventory.json');
        res.send(JSON.stringify(result.rows, null, 2));
    } catch (err) {
        console.error('Database Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
