/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import CourseList from './components/CourseList';
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
    fetchCourses();
    checkLoginStatus();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again later.');
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setIsAdmin(userData.isAdmin);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('isAdmin', userData.isAdmin);
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
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
        {error && <div className="error-message">{error}</div>}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/news" component={NewsPage} />
          <Route exact path="/courses">
            <CourseList courses={courses} onBookCourse={handleBooking} />
          </Route>
          <Route path="/course/:id">
            <CourseDetail courses={courses} />
          </Route>
          <Route path="/booking" component={BookingPage} />
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? (
              isAdmin ? <AdminDashboard /> : <UserDashboard user={user} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
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