const express = require('express');
const router = express.Router();
const axios = require('axios');

// Vulnerable to Server-Side Request Forgery (SSRF)
// Example: /ssrf?url=http://localhost:3000/secrets
router.get('/ssrf', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch URL');
  }
});

// A secret endpoint for the SSRF to target
router.get('/secrets', (req, res) => {
  res.send('This is a secret internal endpoint.');
});

module.exports = router;
