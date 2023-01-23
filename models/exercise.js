const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
  muscles: [String]
});

module.exports = mongoose.model('Exercise', exerciseSchema);
