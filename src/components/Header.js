// src/components/Header.js
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, isAdmin }) {
  return (
    <header>
      <h1>課程介紹與預約</h1>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/logout">Logout</Link>
            {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Header;