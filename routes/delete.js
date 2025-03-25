const express = require('express');
const axios = require('axios');
const router = express.Router();

const PREVIEW_API_BASE_URL = 'https://admin.hlx.page/preview/org/repo/main';
const LIVE_API_BASE_URL = 'https://admin.hlx.page/live/org/repo/main';
const COOKIE_HEADER = ""; // Replace with appropriate cookie string

// Proxy route to handle URL deletion
router.post('/', async (req, res) => {
  const path = req.body.path;

  if (!path)    {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  try {
    console.log(`${PREVIEW_API_BASE_URL}/${path}`);
    // First call to the preview API
    const previewResponse = await axios.delete(`${PREVIEW_API_BASE_URL}/${path}`, {
      headers: { Cookie: COOKIE_HEADER },
    });

    if (previewResponse.status === 204) {
      console.log(`Preview API success for path: ${path}`);
      // Second call to the live API
      const liveResponse = await axios.delete(`${LIVE_API_BASE_URL}/${path}`, {
        headers: { Cookie: COOKIE_HEADER },
      });

      if (liveResponse.status === 204) {
        console.log(`Live API success for path: ${path}`);
        return res.json({ message: `Successfully deleted for path: ${path}` });
      } else {
        console.error(`Live API failed for path: ${path}`);
        return res.status(500).json({ error: `Failed to delete live URL for path: ${path}` });
      }
    } else {
      console.error(`Preview API failed for path: ${path} ${previewResponse.status}`);
      return res.status(500).json({ error: `Failed to delete preview URL for path: ${path}` });
    }
  } catch (error) {
    console.error('Error processing API requests:', error.message);
    res.status(500).json({ error: 'An error occurred while processing the requests' });
  }
});

module.exports = router;
