/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CoursesOverview from './components/CoursesOverview';
import CourseDetail from './components/CourseDetail';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import BookingForm from './components/BookingForm';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched courses:', data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again later.');
      }
    };

    fetchCourses();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setIsAdmin(userData.isAdmin);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('isAdmin', userData.isAdmin.toString());
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
  };

  const handleBooking = (course) => {
    setSelectedCourse(course);
  };

  return (
    <Router>
      <div className="App">
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />        {error && <div className="error-message">{error}</div>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/courses" element={<CoursesOverview courses={courses} />} />
          <Route path="/courses/:id" element={<CourseDetail courses={courses} />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/dashboard" element={
            isLoggedIn ? (
              isAdmin ? <AdminDashboard /> : <UserDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
        {selectedCourse && (
          <BookingForm
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            user={user}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;