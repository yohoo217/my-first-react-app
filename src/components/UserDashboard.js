import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const UserDashboard = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = useCallback(async () => {
    if (user && user._id) {
      try {
        const response = await fetch(`http://localhost:5001/api/bookings/user/${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-dashboard">
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Bookings:</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.courseName} - {new Date(booking.date).toLocaleDateString()}
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;