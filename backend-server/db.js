const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createConnection({
    connectionLimit: 10, // Limit the number of simultaneous connections
    host: 'localhost',   // Replace with your DB host
    user: 'root',        // Replace with your DB user
    password: 'root', // Replace with your DB password
    database: 'taskdb'   // Replace with your DB name
});

module.exports = db;