const axios = require("axios");

test("GET /feedbacks on production backend", async () => {
  const res = await axios.get("https://aurellfeedback-backend.fly.dev/feedbacks");
  expect(res.status).toBe(200);
});
