const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Protected task routes
app.use("/api/task", taskRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});