const axios = require("axios");
import config from "../config";
useConfi

const BASE_URL = "https://aurellfeedback-backend.fly.dev";

axios.get(`${BASE_URL}/feedback`)
  .then(res => {
    console.log("Status:", res.status);
    console.log("Data:", res.data);
  })
  .catch(err => {
    console.error("Error:", err.message);
  });
