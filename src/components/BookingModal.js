/*BookingModal.js*/
import React, { useState } from 'react';

function BookingModal({ course, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseName: course.name,
        name,
        email,
        date,
        time
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('預約成功:', data);
      onClose();
    })
    .catch(error => {
      console.error('預約錯誤:', error);
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>預約 {course.name}</h2>
        <form onSubmit={handleSubmit}>
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

export default BookingModal;
