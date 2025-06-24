const express = require('express');
const router = express.Router();

// Vulnerable to Unvalidated Redirect
// Example: /redirect?to=http://evil.com
router.get('/redirect', (req, res) => {
  const redirectTo = req.query.to;
  if (redirectTo) {
    res.redirect(redirectTo);
  } else {
    res.send('No redirect URL provided.');
  }
});

module.exports = router;
