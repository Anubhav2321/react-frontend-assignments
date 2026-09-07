const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  setTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/:id').get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
