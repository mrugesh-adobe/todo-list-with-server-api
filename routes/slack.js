const express = require('express');
const axios = require('axios');
const router = express.Router();

// Proxy route to fetch asset data for a given block ID
router.get('/', async (req, res) => {
  try {
    await sendSlackMessage('test message');
    res.json({ success: true }); // Send success response if sendSlackMessage succeeds
  } catch (error) {
    console.error('Error sending Slack message:', error);
    res.status(500).json({ error: 'Failed to send Slack message' });
  }
});

async function sendSlackMessage(message) {
  const slackWebhookUrl = '#';

  try {
    const response = await axios.post(slackWebhookUrl, { text: message }, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status !== 200) {
      throw new Error(`Slack API responded with status: ${response.status}`);
    }

    console.log('Message posted to Slack successfully');
  } catch (error) {
    console.error(`Failed to send message to Slack: ${error.message}`);
    throw error; // Ensure the error is propagated
  }
}

module.exports = router;
