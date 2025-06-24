const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

// Vulnerable to NoSQL Injection
// Example: /nosqli?user=admin&pass[$ne]=null
router.get('/nosqli', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.findOne({ 
      user: req.query.user,
      pass: req.query.pass 
    }, function(err, user) {
      if (user) {
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
      client.close();
    });
  });
});

module.exports = router;
