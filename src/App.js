/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import BookingForm from './components/BookingForm';
import './App.css';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  



  useEffect(() => {
    fetch('http://localhost:5001/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setIsAdmin(username === 'admin'); // Just an example, replace with actual logic
  };

  const handleBooking = (course) => {
    setSelectedCourse(course);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Switch>
          <Route exact path="/">
            <CourseList courses={courses} onBookCourse={handleBooking} />
          </Route>
          <Route path="/course/:id">
            <CourseDetail courses={courses} />
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/admin">
            {isAdmin ? <AdminDashboard /> : <Redirect to="/" />}
          </Route>
        </Switch>
        {selectedCourse && (
          <BookingForm
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;