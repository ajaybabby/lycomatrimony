import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subscription.css';

const Subscription = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        setIsLoggedIn(true);
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const plans = [
    {
      name: "Basic",
      price: "₹500",
      duration: "1 Month",
      features: [
        "View up to 50 profiles",
        "Send 10 interests",
        "Basic match alerts",
        "View contact details"
      ]
    },
    {
      name: "Standard",
      price: "₹1,500",
      duration: "3 Months",
      features: [
        "View up to 150 profiles",
        "Send 40 interests",
        "Priority match alerts",
        "View contact details",
        "Chat with matches"
      ]
    },
    {
      name: "Premium",
      price: "₹2,500",
      duration: "6 Months",
      features: [
        "Unlimited profile views",
        "Send unlimited interests",
        "Priority match alerts",
        "View contact details",
        "Chat with matches",
        "Astrology compatibility",
        "Featured profile boost"
      ]
    },
    {
      name: "Royal",
      price: "₹4,500",
      duration: "12 Months",
      features: [
        "All Premium features",
        "Personal relationship manager",
        "Background verification",
        "Priority customer support",
        "Video calls with matches",
        "Profile highlight for 30 days"
      ]
    }
  ];

  return (
    <div className="subscription-container">
      <header className="main-header">
        <nav>
          <div className="logo">
            <h1>Perfect Match</h1>
            <span className="tagline">Where Hearts Unite</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/matches">Matches</a>
            <a href="/search">Search</a>
            <a href="/about">About</a>
            <div className="auth-buttons">
              {isLoggedIn ? (
                <div className="user-profile-menu">
                  <span className="user-name">{userData?.first_name || 'User'}</span>
                  <div className="dropdown-content">
                    <a href="/profile">My Profile</a>
                    <a href="/preferences">Preferences</a>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <a href="/" className="login-btn">Login</a>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="subscription-content">
        <h1>Choose Your Perfect Plan</h1>
        <p className="subtitle">Find your soulmate with our premium features</p>
        
        <div className="plans-container">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.name.toLowerCase()}`}>
              <div className="plan-header">
                <h2>{plan.name}</h2>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="duration">/{plan.duration}</span>
                </div>
              </div>
              <div className="plan-features">
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="subscribe-btn">Subscribe Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;