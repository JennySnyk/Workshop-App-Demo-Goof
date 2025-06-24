const express = require('express');
const router = express.Router();

// Vulnerable to Reflected XSS
// Example: /another-xss?username=Guest<script>alert('xss')</script>
router.get('/another-xss', (req, res) => {
  const username = req.query.username || 'Guest';
  res.send(`<h2>Welcome, ${username}!</h2>`);
});

module.exports = router;
