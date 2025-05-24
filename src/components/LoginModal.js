import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

const LoginModal = ({ showLoginModal, setShowLoginModal }) => {
  const navigate = useNavigate();
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isOtpLogin ? { email, otp } : { email, password }),
      });
      const data = await response.json();
      
      // Add debugger statement here
      
      console.log('Login response:', data);
      console.log('Login data details:', {
        token: data.data.userToken,
        userId: data.data.userId,
        subscription: data.data.subscription
      });
      
      if (data.success && data.data.userToken) {
        localStorage.setItem('userToken', data.data.userToken);
        localStorage.setItem('userId', data.data.userId);
        localStorage.setItem('subscription', data.data.subscription);
        localStorage.setItem('isLoggedIn', 'true');
        setShowLoginModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={`login-modal ${showLoginModal ? 'show' : ''}`}>
      <div className="login-modal-content">
        <button className="close-btn" onClick={() => setShowLoginModal(false)}>×</button>
        <h2>Login to Your Account</h2>
        <div className="login-type-toggle">
          <button 
            className={!isOtpLogin ? 'active' : ''} 
            onClick={() => setIsOtpLogin(false)}
          >
            Password Login
          </button>
          <button 
            className={isOtpLogin ? 'active' : ''} 
            onClick={() => setIsOtpLogin(true)}
          >
            OTP Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {isOtpLogin ? (
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="button" className="send-otp-btn">Send OTP</button>
            </div>
          ) : (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="login-submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;