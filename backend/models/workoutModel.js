const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    // _id: {
    //   type: mongoose.SchemaTypes.Mixed,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('workout', workoutSchema);
