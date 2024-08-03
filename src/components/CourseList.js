import React from 'react';
import PropTypes from 'prop-types';
import CourseItem from './CourseItem';

const CourseList = ({ courses, onBookCourse }) => {
  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {courses.map(course => (
        <CourseItem key={course.id} course={course} onBook={onBookCourse} />
      ))}
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBookCourse: PropTypes.func.isRequired,
};

export default CourseList;