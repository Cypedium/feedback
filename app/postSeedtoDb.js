const axios = require('axios');
const fs = require('fs');

// Load JSON data from file
const feedbackData = JSON.parse(fs.readFileSync('seed.json', 'utf8'));

// Define your API endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/feedback` : 'http://localhost:4000/feedback';

// Function to post each feedback entry
async function postSeedtoDb() {
  for (const entry of feedbackData) {
    try {
      const { rating, comment, productId, username } = entry;
      const response = await axios.post(endpoint, {
        rating,
        comment,
        productId,
        username,
        withCredentials: true
      });
      console.log(`✅ Posted feedback for ${username}: ${response.data.message}`);
    } catch (error) {
      console.error(`❌ Failed to post feedback for ${entry.username}:`, error.message);
    }
  }
}

postSeedtoDb();