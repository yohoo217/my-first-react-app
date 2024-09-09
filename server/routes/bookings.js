// server/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/user/:userId', async (req, res) => {
  try {
    // 確保請求的用戶ID與授權的用戶ID匹配
    if (req.params.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access these bookings' });
    }
    
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  console.log('Received booking request:', req.body);
  console.log('User ID from auth middleware:', req.userId);

  if (!req.userId) {
    return res.status(401).json({ message: 'User ID not found in request' });
  }

  const booking = new Booking({
    courseId: req.body.courseId,
    courseName: req.body.courseName,
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    userId: req.userId
  });

  try {
    const newBooking = await booking.save();
    console.log('New booking created:', newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;