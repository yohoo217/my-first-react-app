/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';


function CourseItem({ course, onBook }) {
  return (
    <div className="course-item">
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <button onClick={() => onBook(course)}>預約此課程</button>
    </div>
  );
}

CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBook: PropTypes.func.isRequired,
};

export default CourseItem;