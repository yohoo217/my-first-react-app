// src/components/NewsPage.js
import React from 'react';
import './NewsPage.css';
import './SharedStyles.module.css';


const NewsPage = () => {
  return (
    <div className="news-page">
      <div className="hero-image">
        <h1 className="hero-title">最新消息</h1>
      </div>
      <div className="news-content">
        <div className="news-item">
          <h2>2024 年 7 月 24 日</h2>
          <h3>秋季日語課程開放報名</h3>
          <p>
            我們很高興地宣布，2024年秋季日語課程現招生開跑囉以「主題情境」來編排課程，讓大家嘗試跳脫以語彙和文法為主的學習模式，透過多樣化的情境聯想，練習相關的對話內容和所需的詞彙與文法。！本季課程將聚焦於日本文化與商務日語，幫助學員在工作和生活中更好地運用日語。
          </p>
          <a href="#" className="read-more">閱讀更多</a>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;