// src/components/HomePage.js
import React from 'react';
import './HomePage.css'; // 確保創建並導入對應的 CSS 文件
import './SharedStyles.module.css';


const HomePage = () => {
  return (
    <div className="home-page">
      <main className="main-content">
        <h1>讓我們一起用語言和文化的濾鏡看世界</h1>
        <p>Let&apos;s see the world through linguistic and cultural perspectives!</p>
      </main>
    </div>
  );
};

export default HomePage;