const express = require('express');
const {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

router.get('/', getAllWorkouts);
router.post('/', createWorkout);
router.get('/:id', getWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
