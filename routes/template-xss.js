const express = require('express');
const router = express.Router();
const ejs = require('ejs');

// Vulnerable to template-based XSS
// Example: /template-xss?content=<img src=x onerror=alert('xss')>
router.get('/template-xss', (req, res) => {
  const userInput = req.query.content || 'No content provided';
  // Using <%- %> in EJS is for unescaped output, which leads to XSS.
  const template = '<h1>User-provided content:</h1> <%- content %>';
  const html = ejs.render(template, { content: userInput });
  res.send(html);
});

module.exports = router;
