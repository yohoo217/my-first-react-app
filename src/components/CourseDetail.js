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