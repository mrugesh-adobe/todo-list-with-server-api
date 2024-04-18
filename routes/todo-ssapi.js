const express = require('express');
const axios = require('axios'); // Assuming you're using axios for HTTP requests
const router = express.Router();

const API_URL = 'https://dummyjson.com/todos';

// List todos
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const todos = response.data;
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Add todo
router.post('/add', async (req, res) => {
    const { todo } = req.body;
    if (!todo) {
        return res.status(400).json({ error: 'Todo is required' });
    }

    try {
        // Assume sending a POST request with the new todo
        const response = await axios.post(API_URL, { todo });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// Delete todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Todo ID is required' });
    }

    try {
        // Assume sending a DELETE request to the API endpoint with the todo ID
        const response = await axios.delete(`${API_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

module.exports = router;

