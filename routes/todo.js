// Local API calls
const express = require('express');
const router = express.Router();

let todos = ['Item 1'];

// GET /todo
router.get('/', (req, res) => {
  res.render('index', { todos });
});

// POST /todo/add
router.post('/add', (req, res) => {
  const newItem = req.body.item;
  todos.push(newItem);
  res.redirect('/todo');
});

// POST /todo/delete
router.post('/delete', (req, res) => {
  const itemToDelete = req.body.item;
  todos = todos.filter(todo => todo !== itemToDelete);
  res.redirect('/todo');
});

module.exports = router;
