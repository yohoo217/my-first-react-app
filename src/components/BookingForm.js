/*BookingForm.js*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';


function BookingForm({ course, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
  
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
  
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // 確保這裡使用 'Bearer ' 前綴
        },
        body: JSON.stringify({
          courseId: course._id,
          courseName: course.name,
          name,
          email,
          date,
          time
        }),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Failed to book');
      }
  
      const data = await response.json();
      console.log('Booking successful:', data);
      alert('Booking successful!');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.message || 'Booking failed, please try again.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>預約 {course.name}</h2>
          <div>
            <label htmlFor="name">姓名：</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">電子郵件：</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">日期：</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="time">時間：</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit">提交預約</button>
          <button type="button" onClick={onClose}>取消</button>
        </form>
      </div>
    </div>
  );
}

BookingForm.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingForm;