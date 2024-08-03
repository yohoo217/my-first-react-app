// src/components/BookingPage.js
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

const BookingPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // 這裡應該從 API 獲取課程列表
    // 暫時使用模擬數據
    setCourses([
      { id: '1', name: '網頁開發基礎', description: '學習 HTML, CSS 和 JavaScript' },
      { id: '2', name: '數據分析入門', description: '使用 Python 進行數據分析' },
      { id: '3', name: 'AI 與機器學習', description: '人工智能和機器學習的基礎知識' },
    ]);
  }, []);

  return (
    <div className="booking-page">
      <h1>預約課程</h1>
      {!selectedCourse ? (
        <div>
          <h2>選擇課程</h2>
          <ul>
            {courses.map(course => (
              <li key={course.id}>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <button onClick={() => setSelectedCourse(course)}>預約</button>
              </li>
            ))}
          </ul>
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