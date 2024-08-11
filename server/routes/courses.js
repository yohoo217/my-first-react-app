// server/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// 獲取所有課程
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 獲取單個課程
router.get('/:id', async (req, res) => {
  console.log('Received request for course ID:', req.params.id);
  try {
    const course = await Course.findById(req.params.id);
    console.log('Found course:', course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error finding course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Add a new course
router.post('/', async (req, res) => {
  const course = new Course({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;