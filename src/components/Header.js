import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

function Header({ isLoggedIn, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="nav-left">
        <img 
          src="https://static.ottercdn.com/trek/media/8371159a-d4c1-40f3-a413-704b12a2e7b8.png" 
          alt="柯琳先生語言工作室" 
          className="logo"
        />
        <span className="brand-name">柯琳先生語言工作室</span>
      </div>
      <nav className="nav-menu">
        <Link to="/">首頁</Link>
        <Link to="/news">最新消息</Link>
        <div className="dropdown">
          <Link to="/courses" className="dropbtn">課程資訊</Link>
          <button onClick={toggleDropdown} className="dropdown-arrow">
            ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/courses/66ae5d1359e9598a463be248">旅遊日文班</Link>
              <Link to="/courses/66ad08a4841e69a74ed3e4f2">日文主題會話班</Link>
              <Link to="/courses/66ad0e5f405be3b46210760e">日語家教</Link>
              <Link to="/courses/66ae5f68efe57d99fac184ae">英語家教</Link>
            </div>
          )}
        </div>
        <Link to="/booking">預約課程</Link>
        {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-button">登出</button>
      ) : (
          <Link to="/login">登入</Link>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;