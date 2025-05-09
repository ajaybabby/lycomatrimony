import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationModal from '../components/RegistrationModal';
import LoginModal from '../components/LoginModal';
import './home1.css';

const Home1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('Myself');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState({ day: '', month: '', year: '' });
  const [education, setEducation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();
  const handleFindMatches = () => {
    if (isLoggedIn) {
      navigate('/matches');
    } else {
      setShowModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };


  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      console.log('Checking login status:', { token, userId });
      
      if (token && userId) {
        setIsLoggedIn(true);
        console.log('User is logged in, fetching data...');
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          console.log('User data received:', data);
          if (data.success) {
            setUserData(data.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No token or userId found, user not logged in');
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Add a new effect to monitor login state changes
  useEffect(() => {
    console.log('Login state changed:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="home-container">
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
                <>
                  <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
                  <button className="register-btn" onClick={handleFindMatches}>Register Free</button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className={`fade-in ${isVisible ? 'visible' : ''}`}>
            Find Your Perfect Life Partner
          </h1>
          <p className="subtitle">Join millions of happy couples who found their soulmate</p>
          
          {/* Move Quick Match section here */}
          <div className="match-container">
            <h2>Quick Match</h2>
            <div className="match-filters">
              <div className="filter-group">
                <label>I'm looking for a</label>
                <select>
                  <option>Bride</option>
                  <option>Groom</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Age</label>
                <div className="age-range">
                  <select>
                    {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                  <span>to</span>
                  <select>
                    {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-group">
                <label>Religion</label>
                <select>
                  <option>All Religions</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Buddhist</option>
                  <option>Jain</option>
                </select>
              </div>
              <button className="search-now" onClick={handleFindMatches}>Find Matches</button>
            </div>
          </div>
        </div>
      </section><section className="hero">
        <section className="categories">
          <div className="category-cards">
            <div className="category-card">
              <div className="card-front">
                <i className="fas fa-star"></i>
                <h3>Astrology</h3>
              </div>
              <div className="card-back">
                <p>Find your perfect match based on zodiac compatibility and astronomical alignments. Expert astrologers guide your journey.</p>
              </div>
            </div>

            <div className="category-card">
              <div className="card-front">
                <i className="fas fa-users"></i>
                <h3>Community</h3>
              </div>
              <div className="card-back">
                <p>Connect with people from your community. Search by caste, sub-caste, and cultural preferences.</p>
              </div>
            </div>

            <div className="category-card">
              <div className="card-front">
                <i className="fas fa-pray"></i>
                <h3>Religion</h3>
              </div>
              <div className="card-back">
                <p>Find matches within your religious beliefs. Filter by religious practices and traditions.</p>
              </div>
            </div>

            <div className="category-card">
              <div className="card-front">
                <i className="fas fa-moon"></i>
                <h3>Horoscope Match</h3>
              </div>
              <div className="card-back">
                <p>Detailed horoscope matching with Kundli analysis and Guna Milan calculations.</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Remove the separate quick-match section */}
      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>100% Profile Verification</h3>
            <p>All profiles undergo strict verification process</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <h3>Qualified Matches</h3>
            <p>Advanced matching algorithm for perfect compatibility</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Success Stories</h3>
            <p>Thousands of happy marriages and counting</p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        <div className="stories-carousel">
          <div className="story-card">
            <div className="couple-image"></div>
            <div className="story-content">
              <h3>Rahul & Priya</h3>
              <p>"Found our perfect match here. The journey was amazing!"</p>
              <span className="marriage-date">Married on 15th June 2023</span>
            </div>
          </div>
          {/* Add more story cards */}
        </div>
      </section>

      {/* Download App Section */}
      <section className="app-download">
        <div className="app-content">
          <h2>Find Matches On The Go</h2>
          <p>Download our mobile app and find your perfect match anywhere, anytime</p>
          <div className="app-buttons">
            <button className="app-store">
              <i className="fab fa-apple"></i> App Store
            </button>
            <button className="play-store">
              <i className="fab fa-google-play"></i> Play Store
            </button>
          </div>
        </div>
        <div className="app-image"></div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Leading matrimony service for finding your perfect life partner</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#search">Search</a>
            <a href="#membership">Membership</a>
            <a href="#success">Success Stories</a>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@perfectmatch.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {!isLoggedIn && (
        <>
          <LoginModal 
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
      <RegistrationModal 
        showModal={showModal}
        setShowModal={setShowModal}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        education={education}
        setEducation={setEducation}
        company={company}
        setCompany={setCompany}
        salary={salary}
        setSalary={setSalary}
      />
        </>
      )}
    </div>
  );
};

export default Home1;