const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://sap.frontify.com/api/document-block';
const BASE_URL = 'https://sap.frontify.com';

// Proxy route to fetch asset data for a given block ID
router.get('/:blockId', async (req, res) => {
    const blockId = req.params.blockId;
    try {
      const response = await axios.get(`${API_URL}/${blockId}/asset`, {
          headers: {
            Cookie: "",
          }
        });
        const assetData = response.data;
        res.json(assetData);
    } catch (error) {
        console.error('Error fetching asset:', error);
        res.status(500).json({ error: 'Failed to fetch asset' });
    }
});

// Proxy route to fetch asset data for a given block ID
router.get('/r/:Id', async (req, res) => {
  const Id = req.params.Id;
  try {
    const response = await axios.get(`${BASE_URL}/r/${Id}`, {
        maxRedirects: 5,
        headers: {
          Cookie: "",
        }
      });
      console.log(response);
      // Send back the URL of the final response page
      res.json({ url: response.request.res.responseUrl });
  } catch (error) {
      console.error('Error fetching asset:', error);
      res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

module.exports = router;
