import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) {
        setError('課程 ID 未定義');
        return;
      }

      const apiUrl = `http://localhost:5001/api/courses/${id}`;
      console.log('Fetching course from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received course data:', data);
        
        if (!data || Object.keys(data).length === 0) {
          throw new Error('No course data received');
        }
        
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(`無法找到課程或獲取課程詳細信息時發生錯誤: ${error.message}`);
      }
    };

    fetchCourseDetail();
  }, [id]);

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
        <p>請求的 URL: http://localhost:5001/api/courses/{id}</p>
        <button onClick={() => history.push('/courses')}>返回課程列表</button>
      </div>
    );
  }

  if (!course) return <div>載入中...</div>;

  // 假設 course.features 是一個包含特性對象的數組
  const features = course.features || [
    { title: '實用旅遊日語', description: '學習基本禮儀和重點句型，輕鬆與日本人溝通，表達需求和禮意。' },
    { title: '日本文化知識', description: '深入了解日本 9 大地區、46 都道府縣的風光和文化特色，豐富您的旅遊體驗。' },
    { title: '主題式學習', description: '從櫻花季到剪紙藝術，透過多元主題，學習相關日語並探索日本特色景點。' }
  ];

  return (
    <div className="course-detail-container">
      <div className="course-main-content">
        <div className="course-image-container">
          {course.image ? (
            <img src={course.image} alt={course.name} className="course-image" />
          ) : (
            <img src="/placeholder-image.jpg" alt="Course Image" className="course-image" />
          )}
        </div>
        <div className="course-info">
          <h1 className="course-title">{course.subname}</h1>
          <p className="course-description">{course.description}</p>
        </div>
      </div>
      
      <div className="course-features">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.image} alt={feature.title} className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;