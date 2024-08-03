// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // 確保創建並導入對應的 CSS 文件
import './SharedStyles.module.css';


const HomePage = () => {
  return (
    <div className="home-page">
    <nav className="top-nav">
      <div className="nav-left">
        <span className="logo">👤</span>
        <span className="brand-name">柯琳先生語言工作室</span>
      </div>
      <div className="nav-right">
        <Link to="/">首頁</Link>
        <Link to="/news">最新消息</Link>
        <div className="dropdown">
          <Link to="/courses">課程資訊 ▼</Link>
          <div className="dropdown-content">
            <Link to="/courses/beginner">初級課程</Link>
            <Link to="/courses/intermediate">中級課程</Link>
            <Link to="/courses/advanced">高級課程</Link>
          </div>
        </div>
        <Link to="/booking">預約課程</Link>
      </div>
    </nav>
      <main className="main-content">
        <h1>讓我們一起用語言和文化的濾鏡看世界</h1>
        <p>Let&apos;s see the world through linguistic and cultural perspectives!</p>
      </main>
    </div>
  );
};

export default HomePage;