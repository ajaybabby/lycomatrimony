import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="main-header">
        <nav>
          <div className="logo">
            <h1>Matrimony</h1>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#search">Search</a>
            <a href="#contact">Contact</a>
            <button className="login-btn">Login</button>
            <button className="register-btn">Start Your Perfect Journey</button>
          </div>
        </nav>
      </header>

      <section className="hero">
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

      <section className="quick-search">
        <h2>Quick Search</h2>
        <div className="search-filters">
          <select name="looking-for">
            <option value="">Looking for</option>
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
          </select>
          <select name="age">
            <option value="">Age</option>
            <option value="18-25">18-25</option>
            <option value="26-30">26-30</option>
            <option value="31-35">31-35</option>
            <option value="36+">36+</option>
          </select>
          <select name="religion">
            <option value="">Religion</option>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="sikh">Sikh</option>
          </select>
          <select name="location">
            <option value="">Location</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
          </select>
          <button className="search-btn">Search</button>
        </div>
      </section>

      

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-user-shield"></i>
            <h3>Verified Profiles</h3>
            <p>All profiles are manually verified for authenticity</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-heart"></i>
            <h3>Success Stories</h3>
            <p>Thousands of happy marriages and counting</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-lock"></i>
            <h3>Privacy Control</h3>
            <p>You have full control over your information</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;