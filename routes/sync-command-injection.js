const express = require('express');
const router = express.Router();
const { execSync } = require('child_process');

// Vulnerable to Command Injection using execSync
// Example: /sync-ci?file=test.txt;whoami
router.get('/sync-ci', (req, res) => {
  const fileName = req.query.file;
  try {
    // The use of execSync with user input is a clear command injection vulnerability.
    const result = execSync(`ls -l ${fileName}`);
    res.send(`<pre>${result.toString()}</pre>`);
  } catch (error) {
    res.status(500).send(`<pre>${error.toString()}</pre>`);
  }
});

module.exports = router;
