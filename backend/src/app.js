const express = require("express");
const mongoose = require("mongoose"); // Add Mongoose
require("dotenv").config();

const routes = require("./routes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api", routes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Framework Project!");
});

module.exports = app;
