// server/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  // 可以添加更多字段，如价格、时长等
});

module.exports = mongoose.model('Course', CourseSchema);