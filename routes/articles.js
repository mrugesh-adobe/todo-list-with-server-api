const express = require('express');
const axios = require('axios'); // Assuming you're using axios for HTTP requests
const router = express.Router();

const API_URL = 'https://stg.maxxia.com.au/marketplace/get-articles';

// List articles
router.get('/', async (req, res) => {
    try {
        // Extract query parameters from the request
        const queryParams = req.query;

        // Construct the query string dynamically from the query parameters
        const queryString = new URLSearchParams(queryParams).toString();

        // Make the API call with the query string
        const response = await axios.get(`${API_URL}?${queryString}`);

        // Extract data from the response
        const articles = response.data;

        // Return the articles as JSON
        res.json(articles);
    } catch (error) {
        console.error(error);

        // Handle errors and send an appropriate response
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

module.exports = router;
