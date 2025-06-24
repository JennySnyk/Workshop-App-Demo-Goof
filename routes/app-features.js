const express = require('express');
const router = express.Router();

// In-memory store for to-do items
let todoItems = [];

// Handle adding a new to-do item
router.post('/todo', (req, res) => {
  const newItem = req.body.item;
  if (newItem) {
    todoItems.push(newItem);
  }
  res.render('index', { title: 'Workshop App Demo', items: todoItems });
});

// Placeholder login handler
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // In a real app, you would validate credentials here
  console.log(`Login attempt with username: ${username}`)
  res.render('index', { title: 'Workshop App Demo', items: todoItems });
});

module.exports = router;
