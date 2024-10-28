const sqlite3 = require('sqlite3').verbose();
// Create a new database instance
const db = new sqlite3.Database('./book-inventory.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Inventory table 

        db.run(
            `CREATE TABLE IF NOT EXISTS Inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      publicationDate TEXT NOT NULL,
      isbn TEXT NOT NULL UNIQUE
    )`,
            (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    console.log('Inventory table created.');
                }
            }
        );
    }
});

module.exports = db;