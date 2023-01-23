const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  name: String,
  description: String,
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shared: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
