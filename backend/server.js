const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Demo user
const demoUser = {
  email: "demo@nexaauth.com",
  password: "password123",
  name: "Demo User",
};

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "NexaAuth backend is running successfully!",
  });
});

// Login API
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

app.listen(PORT, () => {
  console.log(
    `NexaAuth backend running on http://localhost:${PORT}`
  );
});