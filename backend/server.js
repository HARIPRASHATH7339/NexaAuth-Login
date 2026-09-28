const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const demoUser = {
  email: "demo@nexaauth.com",
  password: "password123",
  name: "Demo User",
};

app.get("/", (req, res) => {
  res.json({
    message: "NexaAuth backend is running successfully!",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  if (
    email !== demoUser.email ||
    password !== demoUser.password
  ) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  res.json({
    message: "Login successful!",
    user: {
      email: demoUser.email,
      name: demoUser.name,
    },
  });
});

// Export the Express app for Vercel
module.exports = app;

// Run locally with: node server.js
if (require.main === module) {
  const PORT = 5000;

  app.listen(PORT, () => {
    console.log(
      `NexaAuth backend running on http://localhost:${PORT}`
    );
  });
}