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

// const sqlite3 = require('sqlite3').verbose();

// // Set the database file path based on the environment
// const dbFilePath = process.env.DATABASE_URL || './book-inventory.db';

// // Create a new database instance
// const db = new sqlite3.Database(dbFilePath, (err) => {
//     if (err) {
//         console.error('Error opening database:', err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//         // Inventory table 

//         db.run(
//             `CREATE TABLE IF NOT EXISTS Inventory (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 title TEXT NOT NULL,
//                 author TEXT NOT NULL,
//                 genre TEXT NOT NULL,
//                 publicationDate TEXT NOT NULL,
//                 isbn TEXT NOT NULL UNIQUE
//             )`,
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
const { Client } = require('pg');

// Set the database connection string based on the environment
const dbConnectionString = process.env.DATABASE_URL  // Replace with your default connection string

// Create a new PostgreSQL client instance
const client = new Client({
    connectionString: dbConnectionString,
    ssl: {
        rejectUnauthorized: false, // For secure connection, necessary for Render or cloud providers
    },
});

// Connect to the PostgreSQL database
client.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err.message);
    } else {
        console.log('Connected to the PostgreSQL database.');

        // Inventory table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Inventory (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                genre VARCHAR(255) NOT NULL,
                publicationDate VARCHAR(255) NOT NULL,
                isbn VARCHAR(255) UNIQUE NOT NULL
            )
        `;

        client.query(createTableQuery, (err, result) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Inventory table created or already exists.');
            }
        });
    }
});

module.exports = client;
