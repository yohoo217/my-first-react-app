// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ isLoggedIn }) {
  return (
    <header className="app-header">
      <h1>課程中心</h1>
      <nav>
        <Link to="/">首頁</Link>
        <Link to="/news">最新消息</Link>
        <Link to="/courses">課程資訊</Link>
        <Link to="/booking">預約課程</Link>
        {isLoggedIn ? (
          <Link to="/logout">登出</Link>
        ) : (
          <Link to="/login">登入</Link>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;