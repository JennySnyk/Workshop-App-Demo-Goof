const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// In-memory database for demonstration
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  db.run("INSERT INTO users (id, name) VALUES (1, 'Alice')");
  db.run("INSERT INTO users (id, name) VALUES (2, 'Bob')");
});

// Vulnerable to SQL Injection
// Example: /sqli?id=1 OR 1=1
router.get('/sqli', (req, res) => {
  const userId = req.query.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).send('Error executing query');
    }
    res.send(row ? `User found: ${row.name}` : 'User not found');
  });
});

module.exports = router;
