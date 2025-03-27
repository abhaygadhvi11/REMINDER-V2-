const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'abhay5678',
    database: 'project1'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
