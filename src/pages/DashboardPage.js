import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    pendingInvitations: 0,
    acceptedInvitations: 0,
    recentVisitors: 0,
    profileViews: 0,
    chatsInitiated: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setDashboardData(data.dashboard);
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Add this function for logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="main-header">
        <nav>
          <div className="logo">
            <h1>Perfect Match</h1>
            <span className="tagline">Where Hearts Unite</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/matches">Matches</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/astrologymatch">AstrologyMatch</a>
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
                <>
                  <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
                  <button className="register-btn">Register Free</button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="dashboard-container">
        <div className="profile-summary">
          <div className="profile-header">
            <div className="profile-photo">
              <img src={userData?.profile_photo || process.env.PUBLIC_URL + '/dummymen.jpg'} alt="Profile" />
              <button className="edit-photo">Edit</button>
            </div>
            <div className="profile-info">
              <h2>{userData?.first_name} {userData?.last_name}</h2>
              <p className="profile-id">ID: {userData?.profile_id}</p>
              <div className="membership-status">
                <span className="membership-type">{userData?.membership_type || 'Free Member'}</span>
                <button className="upgrade-btn">Upgrade Now</button>
              </div>
              <div className="verification-status">
                <span className="verified-badge">✓ Blue Tick Verified</span>
                <span className="valid-till">Valid till {userData?.verification_valid_till}</span>
              </div>
            </div>
          </div>

          <div className="activity-summary">
            <div className="activity-card">
              <h3>{dashboardData.pendingInvitations}</h3>
              <p>Pending Invitations</p>
            </div>
            <div className="activity-card">
              <h3>{dashboardData.acceptedInvitations}</h3>
              <p>Accepted Invitations</p>
            </div>
            <div className="activity-card">
              <h3>{dashboardData.recentVisitors}</h3>
              <p>Recent Visitors</p>
            </div>
            <div className="activity-card">
              <h3>{dashboardData.profileViews}</h3>
              <p>Profile Views</p>
            </div>
            <div className="activity-card">
              <h3>{dashboardData.chatsInitiated}</h3>
              <p>Chats Initiated</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button onClick={() => navigate('/matches')}>View Matches</button>
          <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
          <button onClick={() => navigate('/search')}>Search Profiles</button>
          <button onClick={() => navigate('/chat')}>Messages</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;