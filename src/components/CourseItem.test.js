/*CourseItem.test.js*/

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CourseItem from './CourseItem';

test('renders course item correctly', () => {
  const mockCourse = { name: 'React 基礎', description: '學習 React 的基本概念' };
  const mockOnBook = jest.fn();
  
  const { getByText } = render(<CourseItem course={mockCourse} onBook={mockOnBook} />);
  
  expect(getByText('React 基礎')).toBeInTheDocument();
  expect(getByText('學習 React 的基本概念')).toBeInTheDocument();
  
  fireEvent.click(getByText('預約此課程'));
  expect(mockOnBook).toHaveBeenCalledWith(mockCourse);
});