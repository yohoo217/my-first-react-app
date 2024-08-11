//CoursesOverview.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CoursesOverview.css';

const CoursesOverview = ({ courses }) => {
  return (
    <div className="courses-overview">
      <h1>課程資訊</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id} className="course-item">
            <img src={course.image} alt={course.name} />
            <h3>{course.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

CoursesOverview.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CoursesOverview;