const express = require('express');
const router = express.Router();

// Use of insecure random number generation
function generateToken() {
  return Math.random().toString(36).substring(2);
}

router.get('/token', (req, res) => {
  const token = generateToken();
  res.send(`Your insecure token is: ${token}`);
});

module.exports = router;
