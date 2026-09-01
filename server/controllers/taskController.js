const Task = require("../models/Task");


// ========================================
// GET ALL TASKS
// ========================================

const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// CREATE TASK
// ========================================

const createTask = async (req, res) => {
  try {

    const task = new Task({

      text: req.body.text,

      priority:
        req.body.priority || "medium",

      dueDate:
        req.body.dueDate || null,

      user: req.user.id,

    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);

  } catch (error) {

    console.error("Create task error:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// DELETE TASK
// ========================================

const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ========================================
// UPDATE TASK
// ========================================

const updateTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    task.text = req.body.text;

    task.completed =
      req.body.completed;

    task.priority =
      req.body.priority || "medium";

    task.dueDate =
      req.body.dueDate || null;

    const updatedTask =
      await task.save();

    res.json(updatedTask);

  } catch (error) {

    console.error("Update task error:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};