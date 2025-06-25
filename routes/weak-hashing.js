const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Vulnerable to weak hashing algorithm (MD5)
// Example: POST /hash with body: {"password":"mysecretpassword"}
router.post('/hash', (req, res) => {
  const password = req.body.password;
  if (password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    res.send(`MD5 Hash: ${hash}`);
  } else {
    res.status(400).send('Password is required');
  }
});

module.exports = router;
