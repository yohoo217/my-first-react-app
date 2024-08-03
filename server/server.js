// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


// 定義課程模型
const CourseSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Course = mongoose.model('Course', CourseSchema);

// 定義預約模型
const BookingSchema = new mongoose.Schema({
  courseName: String,
  name: String,
  email: String,
  date: Date,
  time: String
});

const Booking = mongoose.model('Booking', BookingSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// API 路由
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.post('/api/bookings', async (req, res) => {
  const { courseName, name, email, date, time } = req.body;
  if (!courseName || !name || !email || !date || !time) {
    return res.status(400).json({ message: "所有字段都是必需的" });
  }
  const booking = new Booking({ courseName, name, email, date, time });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// New admin routes
app.get('/api/admin/bookings', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send({ message: 'Access denied.' });
  }
  try {
    const bookings = await Booking.find().sort('-date');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/admin/courses', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send({ message: 'Access denied.' });
  }
  try {
    const courses = await Course.find().populate('bookings');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`服務器運行在端口 ${PORT}`));