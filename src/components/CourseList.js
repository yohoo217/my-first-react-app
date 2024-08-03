// src/components/CourseList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';
import './SharedStyles.module.css';
import PropTypes from 'prop-types';


const CourseList = ({ courses }) => {
  return (
    <div className="course-list-page">
    <nav className="top-nav">
      <div className="nav-left">
        <span className="logo">👤</span>
        <span className="brand-name">柯琳先生語言工作室</span>
      </div>
      <div className="nav-right">
        <Link to="/">首頁</Link>
        <Link to="/news">最新消息</Link>
        <div className="dropdown">
          <Link to="/courses">課程資訊 ▼</Link>
          <div className="dropdown-content">
            <Link to="/courses/beginner">初級課程</Link>
            <Link to="/courses/intermediate">中級課程</Link>
            <Link to="/courses/advanced">高級課程</Link>
          </div>
        </div>
        <Link to="/booking">預約課程</Link>
      </div>
    </nav>

      <div className="hero-image">
        <h1 className="hero-title">課程資訊</h1>
      </div>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.name} className="course-image" />
            <div className="course-info">
              <h2>{course.name}</h2>
              <p>{course.shortDescription}</p>
              <ul>
                <li>課程時長：{course.duration}</li>
                <li>難度級別：{course.level}</li>
                <li>開課日期：{course.startDate}</li>
              </ul>
              <Link to={`/course/${course.id}`} className="learn-more-btn">了解更多</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseList;