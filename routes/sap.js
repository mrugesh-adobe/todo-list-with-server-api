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
            Cookie: "intercom-device-id-df8660455b31e47204fef88f8e5f5f5d5efcbcbf=fd24acbc-9312-4188-9f5b-e768ebecf485; PHPSESSID=famo85acqapscd49pjnq9o51s4mqelhg; intercom-session-df8660455b31e47204fef88f8e5f5f5d5efcbcbf=ajR2NGNMcEZ0RDVWT1VXMlpWakVMZ2NoNVBPeDBBaitSb2dMVlNqZkUxc1dqbUZSTlVZaVVyRkkyclVQbTJ3by0tUzU5ZlZpbWI1NkV4M2F1OXBVaCtFQT09--48209e12019ab7d74b9226ebbcc47e8eebe0a797; AWSALB=KSi/qo6kjtXKAo4qoLohqBj0accHx9uVK+gynOlx6bE1G7nw9WEhydEbeOnbUJEqgaXNVJ2OIw1RjNLdWj0/dCCdDPvn8gh5Xf5pHphvgo9nyc/CN7VjvTnzvVbY; AWSALBCORS=KSi/qo6kjtXKAo4qoLohqBj0accHx9uVK+gynOlx6bE1G7nw9WEhydEbeOnbUJEqgaXNVJ2OIw1RjNLdWj0/dCCdDPvn8gh5Xf5pHphvgo9nyc/CN7VjvTnzvVbY; AMP_899c7e29a9=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJhNWZhOTZiZi1lODk1LTQ4YzUtOTEzMi0zNWRjYzhhY2VkYzYlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjI0MDAwMTE2LTMyMDIzMSUyMiUyQyUyMnNlc3Npb25JZCUyMiUzQTE3MzA4NzEyMDkyMzElMkMlMjJvcHRPdXQlMjIlM0FmYWxzZSUyQyUyMmxhc3RFdmVudFRpbWUlMjIlM0ExNzMwODcxMjQ3Nzk0JTJDJTIybGFzdEV2ZW50SWQlMjIlM0EyMSUyQyUyMnBhZ2VDb3VudGVyJTIyJTNBMCU3RA==",
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
          Cookie: "intercom-device-id-df8660455b31e47204fef88f8e5f5f5d5efcbcbf=fd24acbc-9312-4188-9f5b-e768ebecf485; PHPSESSID=famo85acqapscd49pjnq9o51s4mqelhg; intercom-session-df8660455b31e47204fef88f8e5f5f5d5efcbcbf=ajR2NGNMcEZ0RDVWT1VXMlpWakVMZ2NoNVBPeDBBaitSb2dMVlNqZkUxc1dqbUZSTlVZaVVyRkkyclVQbTJ3by0tUzU5ZlZpbWI1NkV4M2F1OXBVaCtFQT09--48209e12019ab7d74b9226ebbcc47e8eebe0a797; AWSALB=KSi/qo6kjtXKAo4qoLohqBj0accHx9uVK+gynOlx6bE1G7nw9WEhydEbeOnbUJEqgaXNVJ2OIw1RjNLdWj0/dCCdDPvn8gh5Xf5pHphvgo9nyc/CN7VjvTnzvVbY; AWSALBCORS=KSi/qo6kjtXKAo4qoLohqBj0accHx9uVK+gynOlx6bE1G7nw9WEhydEbeOnbUJEqgaXNVJ2OIw1RjNLdWj0/dCCdDPvn8gh5Xf5pHphvgo9nyc/CN7VjvTnzvVbY; AMP_899c7e29a9=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJhNWZhOTZiZi1lODk1LTQ4YzUtOTEzMi0zNWRjYzhhY2VkYzYlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjI0MDAwMTE2LTMyMDIzMSUyMiUyQyUyMnNlc3Npb25JZCUyMiUzQTE3MzA4NzEyMDkyMzElMkMlMjJvcHRPdXQlMjIlM0FmYWxzZSUyQyUyMmxhc3RFdmVudFRpbWUlMjIlM0ExNzMwODcxMjQ3Nzk0JTJDJTIybGFzdEV2ZW50SWQlMjIlM0EyMSUyQyUyMnBhZ2VDb3VudGVyJTIyJTNBMCU3RA==",
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
