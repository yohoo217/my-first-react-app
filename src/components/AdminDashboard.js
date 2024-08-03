// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch courses
    fetch('http://localhost:5001/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch bookings
    fetch('http://localhost:5001/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-section">
        <h3>Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course._id}>{course.name} - {course.bookings.length} bookings</li>
          ))}
        </ul>
      </div>
      <div className="dashboard-section">
        <h3>Recent Bookings</h3>
        <ul>
          {bookings.slice(0, 5).map(booking => (
            <li key={booking._id}>{booking.courseName} - {booking.name} ({booking.date})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;