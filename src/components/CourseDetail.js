import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SharedStyles.module.css';

const CourseDetail = ({ courses }) => {
  const { id } = useParams();
  
  console.log('Courses:', courses);
  console.log('ID from params:', id);

  const course = courses.find(c => 
    c._id === id || 
    c._id.toString() === id ||
    c.courseName === id
  );

  console.log('Found course:', course);

  if (!course) return <div>課程未找到</div>;

  return (
    <div className="course-detail-page">
      <div className="course-detail">
        {course.image && <img src={course.image} alt={course.name} className="course-image" />}
        <h1>{course.name}</h1>
        <p>{course.description}</p>
        <div className="course-info">
          <h2>課程詳情</h2>
          <ul>
            {course.duration && <li>課程時長：{course.duration}</li>}
            {course.level && <li>難度級別：{course.level}</li>}
            {course.startDate && <li>開課日期：{course.startDate}</li>}
            {course.price && <li>課程費用：{course.price}</li>}
          </ul>
        </div>
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="course-syllabus">
            <h2>課程大綱</h2>
            <ul>
              {course.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

CourseDetail.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      duration: PropTypes.string,
      level: PropTypes.string,
      startDate: PropTypes.string,
      price: PropTypes.string,
      syllabus: PropTypes.arrayOf(PropTypes.string),
      courseName: PropTypes.string
    })
  ).isRequired,
};

export default CourseDetail;