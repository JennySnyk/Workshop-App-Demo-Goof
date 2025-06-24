const express = require('express');
const router = express.Router();

const users = {
  '1': { name: 'Alice', secret: 'Alice secret' },
  '2': { name: 'Bob', secret: 'Bob secret' }
};

// Vulnerable to Broken Access Control
// User can access other user's secrets by changing the id
// Example: /user/1/secret, /user/2/secret
router.get('/user/:id/secret', (req, res) => {
  const userId = req.params.id;
  const user = users[userId];
  if (user) {
    res.send(`User ${user.name}'s secret is ${user.secret}`);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
