const axios = require("axios");

const BASE_URL = "https://aurellfeedback-backend.fly.dev";

test("GET /feedbacks on production", async () => {
  const res = await axios.get(`${BASE_URL}/feedbacks`);
  console.log(BASE_URL); // Log the base URL for debugging
  console.log("Response data:", res.data); // Log response data for debugging
  expect(res.status).toBe(200);
  expect(Array.isArray(res.data)).toBe(true);
});
