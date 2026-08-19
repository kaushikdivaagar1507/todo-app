const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

// Get tasks
router.get("/", protect, getTasks);

// Add task
router.post("/", protect, createTask);

// Edit / Toggle task
router.put("/:id", protect, updateTask);

// Delete task
router.delete("/:id", protect, deleteTask);

module.exports = router;