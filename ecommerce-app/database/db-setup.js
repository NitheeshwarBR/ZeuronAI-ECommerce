const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/ecommerce.db', err => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`, err => {
        if (err) {
            console.error('Error creating Users table:', err.message);
        } else {
            console.log('Users table created successfully.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        category TEXT,
        date_of_posting TEXT DEFAULT CURRENT_TIMESTAMP
    )`, err => {
        if (err) {
            console.error('Error creating Products table:', err.message);
        } else {
            console.log('Products table created successfully.');
        }
    });
    db.run(`CREATE TABLE IF NOT EXISTS Cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
        )`,err=>{
            if (err) {
                console.error('Error creating Products table:', err.message);
            } else {
                console.log('Carts table created successfully.');
            }
        });
    db.run(`CREATE TABLE IF NOT EXISTS Reviews(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        date_of_review TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
        )`,err=>{
            if (err) {
                console.error('Error creating Products table:', err.message);
            } else {
                console.log('Reviews table created successfully.');
            }
        });
    
});

module.exports = db;
