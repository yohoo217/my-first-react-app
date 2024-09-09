// 文件位置：src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLogin(data);  // 假設這個函數來自props，用於更新App.js中的狀態
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('密碼不匹配');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '註冊失敗');
      }
      setActiveTab('login');
      setError('註冊成功，請登入');
    } catch (err) {
      if (isMounted) {
        setError(err.message || '註冊失敗');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[350px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">歡迎</h2>
        </div>
        <div className="mb-4">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              登入
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === 'register' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              註冊
            </button>
          </div>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="電子郵件" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="密碼" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                登入
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="名稱" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="電子郵件" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="密碼" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="確認密碼" 
                required 
                className="w-full px-3 py-2 border rounded" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                註冊
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;