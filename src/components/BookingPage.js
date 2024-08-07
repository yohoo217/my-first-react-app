// src/components/BookingPage.js
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import './BookingPage.css';

const BookingPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching the courses');
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;

  return (
    <div className="booking-page">
      <h1>預約課程</h1>
      {!selectedCourse ? (
        <div className="course-list">
          {courses.map(course => (
            <div key={course._id} className="course-item">
              <h3>{course.name}</h3>
                <p>{course.duration && <li>課程時長：{course.duration}</li>}</p>
                <p>{course.level && <li>難度級別：{course.level}</li>}</p>
                <p>{course.startDate && <li>開課日期：{course.startDate}</li>}</p>
                <p>{course.price && <li>課程費用：{course.price}</li>}</p>
              <button onClick={() => setSelectedCourse(course)}>選擇此課程</button>
            </div>
          ))}
        </div>
      ) : (
        <BookingForm
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default BookingPage;