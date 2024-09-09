// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Received token in auth middleware:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token in auth middleware:', decoded);

    if (!decoded.id) {
      throw new Error('Token does not contain user ID');
    }

    req.userId = decoded.id;
    console.log('Set userId in auth middleware:', req.userId);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth; 