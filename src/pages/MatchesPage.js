import React, { useState, useEffect } from 'react';
import './MatchesPage.css';

const MatchesPage = () => {
  const [filters, setFilters] = useState({
    ageRange: [18, 45],
    height: '',
    religion: '',
    community: '',
    education: '',
    occupation: '',
    income: '',
    location: '',
  });

  const [matches, setMatches] = useState([]); // Fixed useState declaration
  const [loading, setLoading] = useState(true);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/2/matches');
      const result = await response.json();
      if (result.success) {
        setMatches(result.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="main-header">
        <nav>
          <div className="logo">
            <h1>Perfect Match</h1>
            <span className="tagline">Where Hearts Unite</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="matches">Matches</a>
            <a href="#search">Search</a>
            <a href="about">About</a>
            <div className="auth-buttons">
              <button className="login-btn">Login</button>
              <button className="register-btn">Register Free</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="matches-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <h2>Refine Search</h2>
          
          <div className="filter-section">
            <h3>Age</h3>
            <div className="age-range">
              <input 
                type="number" 
                min="18" 
                max="70" 
                placeholder="From"
              />
              <span>to</span>
              <input 
                type="number" 
                min="18" 
                max="70" 
                placeholder="To"
              />
            </div>
          </div>
  
          <div className="filter-section">
            <h3>Height</h3>
            <select>
              <option value="">Select Height</option>
              <option value="4.5-5">4'5" - 5'0"</option>
              <option value="5-5.5">5'0" - 5'6"</option>
              <option value="5.5-6">5'6" - 6'0"</option>
              <option value="6+">6'0" & above</option>
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Religion</h3>
            <select>
              <option value="">All Religions</option>
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="christian">Christian</option>
              <option value="sikh">Sikh</option>
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Education</h3>
            <select>
              <option value="">All Education</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">Ph.D.</option>
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Annual Income</h3>
            <select>
              <option value="">Any Income</option>
              <option value="0-5">0-5 LPA</option>
              <option value="5-10">5-10 LPA</option>
              <option value="10-15">10-15 LPA</option>
              <option value="15+">15+ LPA</option>
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Location</h3>
            <input type="text" placeholder="Enter city or state" />
          </div>
  
          <button className="apply-filters">Apply Filters</button>
        </div>
  
        {/* Matches Content */}
        <div className="matches-content">
          <div className="matches-header">
            <h1>Matches</h1>
            <div className="matches-actions">
              <select className="sort-by">
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="age">Age</option>
              </select>
              <button className="view-type">
                <i className="fas fa-th-large"></i>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="matches-grid">
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-photo">
                    <img 
                      src={`https://placekitten.com/400/${400 + match.id}`} 
                      alt={`${match.first_name} ${match.last_name}`} 
                    />
                    <div className="card-actions">
                      <button className="interest-btn">Send Interest</button>
                      <button className="reject-btn">Reject</button>
                    </div>
                  </div>
                  <div className="match-info">
                    <h3>{match.first_name} {match.last_name}</h3>
                    <p className="match-basic">
                      {calculateAge(match.date_of_birth)} yrs • {match.location}
                    </p>
                    <p className="match-details">
                      {match.education} • {match.profession}
                    </p>
                    <p className="match-religion">
                      {match.religion} • {match.caste}
                    </p>
                    <p className="match-additional">
                      {match.income} • {match.marital_status}
                    </p>
                    <div className="match-actions">
                      <button className="action-btn"><i className="far fa-heart"></i></button>
                      <button className="action-btn"><i className="far fa-bookmark"></i></button>
                      <button className="action-btn"><i className="far fa-envelope"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchesPage;