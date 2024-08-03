import React from 'react';
import PropTypes from 'prop-types';


const CourseDetail = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      {/* Add more details as needed */}
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