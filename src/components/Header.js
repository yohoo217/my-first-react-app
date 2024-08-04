// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css'; // 確保創建並導入這個 CSS 文件

function Header({ isLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
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
          <button onClick={toggleDropdown} className="dropbtn">
            課程資訊 <span className="dropdown-arrow">▼</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/course/tour_japanese">旅遊日文班</Link>
              <Link to="/coursesDetail/japanese_conversation">日文主題會話班</Link>
              <Link to="/coursesDetail/japanese_private_lesson">日語家教</Link>
              <Link to="/coursesDetail/english_private_lesson">英語家教</Link>
            </div>
          )}
        </div>
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