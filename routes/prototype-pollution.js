const express = require('express');
const router = express.Router();
const _ = require('lodash');

// Vulnerable to Prototype Pollution
// Example: POST /pollute with body: {"__proto__": {"isAdmin": true}}
router.post('/pollute', (req, res) => {
  let user = {};
  _.merge(user, req.body);
  if (user.isAdmin) {
    res.send('Welcome Admin!');
  } else {
    res.send('Welcome User!');
  }
});

module.exports = router;
