//models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  }],
  goals: [{
    type: String,
    goalType: String,
    deadline: Date
  }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
