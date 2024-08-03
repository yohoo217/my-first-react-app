// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserDashboard = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/bookings/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}</h2>
      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking._id}>
              {booking.courseName} - {new Date(booking.date).toLocaleDateString()} {booking.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;