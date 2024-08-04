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
  // 可以添加更多，如價格，時間等
});

module.exports = mongoose.model('Course', CourseSchema);