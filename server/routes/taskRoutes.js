const express = require("express");

const router = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
   updateTask,
} = require("../controllers/taskController");

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

// GET all tasks
router.get("/", getTasks);

// POST create a task
router.post("/", createTask);

module.exports = router;