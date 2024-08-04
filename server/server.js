// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const coursesRouter = require('./routes/courses');
const bookingsRouter = require('./routes/bookings');
const authRouter = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    req.userId = decoded.id;
    next();
  });
};

app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/bookings', verifyToken, bookingsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`伺服器運行在 ${PORT}`));