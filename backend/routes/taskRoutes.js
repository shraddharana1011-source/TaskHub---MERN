const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;