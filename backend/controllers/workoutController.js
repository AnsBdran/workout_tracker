const { default: mongoose } = require('mongoose');
const workoutModel = require('../models/workoutModel');

module.exports = {
  // get all workouts
  getAllWorkouts: async (req, res) => {
    try {
      const workouts = await workoutModel.find({});
      res.json(workouts);
    } catch (err) {
      console.log(err);
    }
  },

  // get a single workout by it's id
  getWorkout: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'no such workout' });
    }
    const workout = await workoutModel.findById(id);

    if (!workout) {
      return res.status(400).json({ error: 'no such workout' });
    }
    res.status(200).json(workout);
  },

  //   create a new workout from the submitted data
  createWorkout: async (req, res) => {
    const { title, reps, load } = req.body;
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  },

  // update a single workout
  updateWorkout: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('not a valid id');
      return res.status(400).json({ error: 'workout not found' });
    }
    const workout = await workoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ we: workout });
  },

  // delete a workout by id
  deleteWorkout: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'workout not found' });
    }
    const workout = await workoutModel.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: 'workout not found!' });
    }
    res.status(200).json(workout);
  },
};
