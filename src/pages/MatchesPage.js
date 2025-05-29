import React, { useState, useEffect } from 'react';
import './MatchesPage.css';
import UserDetailModal from '../components/UserDetailModal';
import SubscriptionPlans from '../components/SubscriptionPlans';
import { useNavigate } from 'react-router-dom';

const MatchesPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/');
      return;
    }
  }, [navigate]);

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

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentInterests, setSentInterests] = useState(new Set());
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showSubscription, setShowSubscription] = useState(false);
  const [pendingInterestId, setPendingInterestId] = useState(null);

  // Add the filteredMatches function
  // Modify the filteredMatches function
  // Add 'received' case to filteredMatches function
  const filteredMatches = () => {
    let filtered = matches;

    switch(activeTab) {
      case 'sent':
        filtered = filtered.filter(match => match.interest_status === 'pending');
        break;
      case 'matched':
        filtered = filtered.filter(match => match.interest_status === 'accepted');
        break;
      case 'received':
        filtered = filtered.filter(match => match.interest_status === 'received');
        break;
    }

    // Then apply search filters
    filtered = filtered.filter(match => {
      // Check each filter criteria
      if (filters.religion && match.religion !== filters.religion) return false;
      if (filters.education && match.education !== filters.education) return false;
      if (filters.location && match.location !== filters.location) return false;
      if (filters.income && match.income !== filters.income) return false;
      
      return true;
    });

    return filtered;
  };

  // Add handleApplyFilters function
  const handleApplyFilters = () => {
    // Force a re-render by updating a state
    setMatches([...matches]);
  };

  // Update the apply filters button
  // Find this in the JSX:

const handleCardClick = (user) => {
  // Pass the complete user object to the modal
  setSelectedUser(user);
};

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

// Add new state for filter options
const [filterOptions, setFilterOptions] = useState({
  religions: new Set(),
  educations: new Set(),
  locations: new Set(),
  incomes: new Set()
});

// Modify fetchUsers to extract filter options from matches
const fetchUsers = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  try {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/${userId}/matches`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (result.success) {
      setMatches(result.data);
      
      // Extract unique values for filters
      const options = {
        religions: new Set(result.data.map(match => match.religion).filter(Boolean)),
        educations: new Set(result.data.map(match => match.education).filter(Boolean)),
        locations: new Set(result.data.map(match => match.location).filter(Boolean)),
        incomes: new Set(result.data.map(match => match.income).filter(Boolean))
      };
      
      setFilterOptions(options);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setLoading(false);
  }
};


    const handleSendInterest = async (matchId) => {
      const hasSubscription = localStorage.getItem('subscription');
      if (hasSubscription) {
        setShowSubscription(true);
        setPendingInterestId(matchId);
        return;
      }
  
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
  
      try {
        const response = await fetch('http://localhost:5000/api/interests/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: matchId
          })
        });
        
        const data = await response.json();
        if (data.success) {
          setSentInterests(prev => new Set([...prev, matchId]));
          alert('Interest sent successfully!');
        } else {
          alert('Failed to send interest. Please try again.');
        }
      } catch (error) {
        console.error('Error sending interest:', error);
        alert('Error sending interest. Please try again.');
      }
    };
  
    const handleSubscribe = async (planName) => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
  
      try {
        const response = await fetch('http://localhost:5000/api/subscriptions/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            planName: planName,
            amount: getPlanAmount(planName)
          })
        });
  
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('subscription', planName);
          setShowSubscription(false);
          
          if (pendingInterestId) {
            await handleSendInterest(pendingInterestId);
            setPendingInterestId(null);
          }
        } else {
          alert('Failed to subscribe. Please try again.');
        }
      } catch (error) {
        console.error('Error subscribing:', error);
        alert('Error subscribing to plan. Please try again.');
      }
    };
  
    const getPlanAmount = (planName) => {
      const planPrices = {
        'Free': 0,
        'Basic': 999,
        'Standard': 1999,
        'Advanced': 2999,
        'Royal': 4999
      };
      return planPrices[planName] || 0;
    };

    // Add these new handler functions
    const handleAcceptInterest = async (matchId) => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');

      try {
        const response = await fetch('http://localhost:5000/api/interests/accept', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            interestId: matchId
          })
        });
        
        const data = await response.json();
        if (data.success) {
          fetchUsers(); // Refresh the matches list
          alert('Interest accepted successfully!');
        }
      } catch (error) {
        console.error('Error accepting interest:', error);
        alert('Error accepting interest. Please try again.');
      }
    };

    const handleDeclineInterest = async (matchId) => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');

      try {
        const response = await fetch('http://localhost:5000/api/interests/decline', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            interestId: matchId
          })
        });
        
        const data = await response.json();
        if (data.success) {
          fetchUsers(); // Refresh the matches list
          alert('Interest declined successfully!');
        }
      } catch (error) {
        console.error('Error declining interest:', error);
        alert('Error declining interest. Please try again.');
      }
    };

    // ... before return statement ...

  // Update the filters sidebar JSX
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
            <select
              value={filters.religion}
              onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
            >
              <option value="">All Religions</option>
              {[...filterOptions.religions].map(religion => (
                <option key={religion} value={religion}>{religion}</option>
              ))}
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Education</h3>
            <select
              value={filters.education}
              onChange={(e) => setFilters({ ...filters, education: e.target.value })}
            >
              <option value="">All Education</option>
              {[...filterOptions.educations].map(education => (
                <option key={education} value={education}>{education}</option>
              ))}
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Location</h3>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="">Any Location</option>
              {[...filterOptions.locations].map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
  
          <div className="filter-section">
            <h3>Annual Income</h3>
            <select
              value={filters.income}
              onChange={(e) => setFilters({ ...filters, income: e.target.value })}
            >
              <option value="">Any Income</option>
              {[...filterOptions.incomes].map(income => (
                <option key={income} value={income}>{income}</option>
              ))}
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
            <div className="matches-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Matches <span className="count">{matches.length}</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
                onClick={() => setActiveTab('sent')}
              >
                Requests Sent <span className="count">
                  {matches.filter(m => m.interest_status === 'pending').length}
                </span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
                onClick={() => setActiveTab('received')}
              >
                Requests Received <span className="count">
                  {matches.filter(m => m.interest_status === 'received').length}
                </span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'matched' ? 'active' : ''}`}
                onClick={() => setActiveTab('matched')}
              >
                Matched <span className="count">
                  {matches.filter(m => m.interest_status === 'accepted').length}
                </span>
              </button>
            </div>
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
              {filteredMatches().map(match => (
                <div key={match.id} className="match-card" onClick={() => handleCardClick(match)}>
                  <div className="match-photo">
                    <img 
                      src={`https://placekitten.com/400/${400 + match.id}`} 
                      alt={`${match.first_name} ${match.last_name}`} 
                    />
                    <div className="card-actions">
                      {match.interest_status === 'pending' ? (
                        <span className="interest-status-pending">Interest Sent</span>
                      ) : match.interest_status === 'received' ? (
                        <div className="received-actions">
                          <button 
                            className="accept-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptInterest(match.id);
                            }}
                          >
                            Accept
                          </button>
                          <button 
                            className="decline-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeclineInterest(match.id);
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      ) : sentInterests.has(match.id) ? (
                        <button className="interest-sent-btn" disabled>
                          Interest Sent
                        </button>
                      ) : (
                        <>
                          <button 
                            className="interest-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendInterest(match.id);
                            }}
                          >
                            Send Interest
                          </button>
                          <button 
                            className="reject-btn" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            Reject
                          </button>
                        </>
                      )}
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
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          onAccept={() => {
            if (selectedUser.interest_status === 'received') {
              handleAcceptInterest(selectedUser.id);
            }
          }}
          onDecline={() => {
            if (selectedUser.interest_status === 'received') {
              handleDeclineInterest(selectedUser.id);
            }
          }}
          onSendInterest={() => handleSendInterest(selectedUser.id)}
        />
      )}
      {showSubscription && (
        <SubscriptionPlans 
          onClose={() => setShowSubscription(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </>
  );
};

export default MatchesPage;


 
