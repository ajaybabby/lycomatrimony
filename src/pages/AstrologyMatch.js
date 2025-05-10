import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AstrologyMatch.css';

const AstrologyMatch = () => {
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

  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({
    zodiacSign: '',
    nakshatra: '',
    rashi: '',
    manglik: 'all',
    horoscopeMatch: 60,
    birthTime: '',
    birthPlace: ''
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="astrology-container">
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

      <section className="astrology-hero">
        <div className="hero-overlay">
          <h1>Astrological Match Making</h1>
          <div className="filters-container">
            <h2>Astrological Preferences</h2>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Zodiac Sign</label>
                <select name="zodiacSign" value={filters.zodiacSign} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="aries">Aries</option>
                  <option value="taurus">Taurus</option>
                  <option value="gemini">Gemini</option>
                  {/* Add all zodiac signs */}
                </select>
              </div>

              <div className="filter-group">
                <label>Nakshatra</label>
                <select name="nakshatra" value={filters.nakshatra} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="ashwini">Ashwini</option>
                  <option value="bharani">Bharani</option>
                  {/* Add all nakshatras */}
                </select>
              </div>

              <div className="filter-group">
                <label>Rashi</label>
                <select name="rashi" value={filters.rashi} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="mesha">Mesha</option>
                  <option value="vrishabha">Vrishabha</option>
                  {/* Add all rashis */}
                </select>
              </div>

              <div className="filter-group">
                <label>Manglik Status</label>
                <select name="manglik" value={filters.manglik} onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="yes">Manglik</option>
                  <option value="no">Non-Manglik</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Minimum Horoscope Match %</label>
                <input
                  type="range"
                  name="horoscopeMatch"
                  min="0"
                  max="100"
                  value={filters.horoscopeMatch}
                  onChange={handleFilterChange}
                />
                <span>{filters.horoscopeMatch}%</span>
              </div>
            </div>

            <button className="search-matches" onClick={() => console.log('Search with filters:', filters)}>
              Find Matches
            </button>
          </div>
        </div>
      </section>

      <section className="astrology-content">
        <div className="matches-container">
          <h2>Astrological Matches</h2>
          <div className="matches-grid">
            {/* Match cards */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AstrologyMatch;