// const sqlite3 = require('sqlite3').verbose();
// // Create a new database instance
// const db = new sqlite3.Database('./book-inventory.db', (err) => {
//     if (err) {
//         console.error('Error opening database:', err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//         // Inventory table 

//         db.run(
//             `CREATE TABLE IF NOT EXISTS Inventory (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT NOT NULL,
//       author TEXT NOT NULL,
//       genre TEXT NOT NULL,
//       publicationDate TEXT NOT NULL,
//       isbn TEXT NOT NULL UNIQUE
//     )`,
//             (err) => {
//                 if (err) {
//                     console.error('Error creating table:', err.message);
//                 } else {
//                     console.log('Inventory table created.');
//                 }
//             }
//         );
//     }
// });

// module.exports = db;

const sqlite3 = require('better-sqlite3');

// Set the database file path based on the environment
const dbFilePath = process.env.DATABASE_URL || './book-inventory.db';

// Create a new database instance
const db = new sqlite3(dbFilePath, { verbose: console.log });

try {
    // Create the Inventory table if it doesn't exist
    db.prepare(`
        CREATE TABLE IF NOT EXISTS Inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT NOT NULL,
            publicationDate TEXT NOT NULL,
            isbn TEXT NOT NULL UNIQUE
        )
    `).run();
    console.log('Inventory table created.');
} catch (err) {
    console.error('Error creating table:', err.message);
}

module.exports = db;

