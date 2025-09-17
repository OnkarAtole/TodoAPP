const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/todos/    -> get todos for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/todos/  -> create todo
router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "Text is required" });
    const todo = new Todo({ text, user: req.user });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/todos/:id -> toggle completed (only owner)
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/todos/:id -> delete (only owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
