//CourseDetail.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './SharedStyles.module.css';
import PropTypes from 'prop-types';


const CourseDetail = ({ courses }) => {
    const { id } = useParams();
    const course = courses.find(c => c.id === id);
  
    if (!course) return <div>課程未找到</div>;
  
    return (
      <div className="course-detail-page">
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
  
        <div className="course-detail">
          <img src={course.image} alt={course.name} className="course-image" />
          <h1>{course.name}</h1>
          <p>{course.description}</p>
          <div className="course-info">
            <h2>課程詳情</h2>
            <ul>
              <li>課程時長：{course.duration}</li>
              <li>難度級別：{course.level}</li>
              <li>開課日期：{course.startDate}</li>
              <li>課程費用：{course.price}</li>
            </ul>
          </div>
          <div className="course-syllabus">
            <h2>課程大綱</h2>
            <ul>
              {course.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <Link to="/booking" className="book-course-btn">立即預約</Link>
        </div>
      </div>
    );
  };

CourseDetail.propTypes = {
    course: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

export default CourseDetail;