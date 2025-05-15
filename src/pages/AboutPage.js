import React, { useState, useEffect } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    religion: '',
    caste: '',
    location: '',
    profession: '',
    income: '',
    maritalStatus: '',
    heightCm: '',
    bodyType: '',
    profileCreatedBy: '',
  });

  const [preferences, setPreferences] = useState({
    minAge: '',
    maxAge: '',
    gender: '',
    prefReligion: '',
    prefCaste: '',
    prefLocation: '',
    prefEducation: '',
    prefMaritalStatus: '',
    prefIncome: '',
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/2/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers if required
        },
        body: JSON.stringify({
          min_age: preferences.minAge,
          max_age: preferences.maxAge,
          gender: preferences.gender,
          religion: preferences.prefReligion,
          caste: preferences.prefCaste,
          location: preferences.prefLocation,
          education: preferences.prefEducation,
          marital_status: preferences.prefMaritalStatus,
          income: preferences.prefIncome
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Preferences saved successfully!');
      } else {
        alert('Failed to save preferences: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error saving preferences. Please try again.');
    }
  };

  return (
    <>
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
              <button className="login-btn">Login</button>
              <button className="register-btn">Register Free</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="about-container">
        <div className="profile-header">
          <div className="profile-photo-section">
            <div className="photo-wrapper">
              <img src="https://via.placeholder.com/150" alt="Profile" className="profile-photo" />
              <div className="photo-overlay">
                <label htmlFor="photo-upload" className="upload-label">
                  <i className="fas fa-camera"></i>
                  <span>Update Photo</span>
                </label>
                <input type="file" id="photo-upload" hidden />
              </div>
            </div>
          </div>
          <div className="profile-summary">
            <h1>Profile Settings</h1>
            <div className="profile-completion">
              <div className="completion-bar">
                <div className="completion-progress" style={{ width: '70%' }}></div>
              </div>
              <span>70% Complete</span>
            </div>
          </div>
        </div>

        <div className="settings-tabs">
          <button className="tab-button active">
            <i className="fas fa-user"></i>
            Basic Info
          </button>
          <button className="tab-button">
            <i className="fas fa-heart"></i>
            Partner Preferences
          </button>
          <button className="tab-button">
            <i className="fas fa-cog"></i>
            Account Settings
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <form onSubmit={handleProfileUpdate} className="modern-form">
              <div className="section-header">
                <h2><i className="fas fa-user-circle"></i> Personal Information</h2>
                <p>Tell us about yourself</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Religion</label>
                  <select
                    value={profile.religion}
                    onChange={(e) => setProfile({...profile, religion: e.target.value})}
                  >
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Caste</label>
                  <input
                    type="text"
                    value={profile.caste}
                    onChange={(e) => setProfile({...profile, caste: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    value={profile.profession}
                    onChange={(e) => setProfile({...profile, profession: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Income</label>
                  <select
                    value={profile.income}
                    onChange={(e) => setProfile({...profile, income: e.target.value})}
                  >
                    <option value="">Select Income Range</option>
                    <option value="0-5">0-5 LPA</option>
                    <option value="5-10">5-10 LPA</option>
                    <option value="10-15">10-15 LPA</option>
                    <option value="15+">15+ LPA</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Marital Status</label>
                  <select
                    value={profile.maritalStatus}
                    onChange={(e) => setProfile({...profile, maritalStatus: e.target.value})}
                  >
                    <option value="">Select Status</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    value={profile.heightCm}
                    onChange={(e) => setProfile({...profile, heightCm: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Body Type</label>
                  <select
                    value={profile.bodyType}
                    onChange={(e) => setProfile({...profile, bodyType: e.target.value})}
                  >
                    <option value="">Select Body Type</option>
                    <option value="Slim">Slim</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Average">Average</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="save-btn">Save Profile</button>
            </form>
          </div>

          <div className="preferences-section">
            <form onSubmit={handlePreferencesUpdate} className="modern-form">
              <div className="section-header">
                <h2><i className="fas fa-heart"></i> Partner Preferences</h2>
                <p>What are you looking for in a partner?</p>
              </div>

              <div className="preferences-grid">
                <div className="preference-card">
                  <h3><i className="fas fa-user-friends"></i> Basic Details</h3>
                  <div className="form-group">
                    <label>Age Range</label>
                    <div className="age-range-inputs">
                      <input
                        type="number"
                        min="18"
                        max="70"
                        placeholder="Min Age"
                        value={preferences.minAge}
                        onChange={(e) => setPreferences({...preferences, minAge: e.target.value})}
                      />
                      <span>to</span>
                      <input
                        type="number"
                        min="18"
                        max="70"
                        placeholder="Max Age"
                        value={preferences.maxAge}
                        onChange={(e) => setPreferences({...preferences, maxAge: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={preferences.gender}
                      onChange={(e) => setPreferences({...preferences, gender: e.target.value})}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select
                      value={preferences.prefMaritalStatus}
                      onChange={(e) => setPreferences({...preferences, prefMaritalStatus: e.target.value})}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="preference-card">
                  <h3><i className="fas fa-pray"></i> Religion & Location</h3>
                  <div className="form-group">
                    <label>Religion</label>
                    <select
                      value={preferences.prefReligion}
                      onChange={(e) => setPreferences({...preferences, prefReligion: e.target.value})}
                    >
                      <option value="">Select Religion</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Sikh">Sikh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Caste</label>
                    <select
                      value={preferences.prefCaste}
                      onChange={(e) => setPreferences({...preferences, prefCaste: e.target.value})}
                    >
                      <option value="">Select Caste</option>
                      <option value="Any">Any</option>
                      {/* Add relevant caste options */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Location</label>
                    <input
                      type="text"
                      value={preferences.prefLocation}
                      onChange={(e) => setPreferences({...preferences, prefLocation: e.target.value})}
                      placeholder="Enter city or state"
                    />
                  </div>
                </div>

                <div className="preference-card">
                  <h3><i className="fas fa-graduation-cap"></i> Education & Career</h3>
                  <div className="form-group">
                    <label>Education Level</label>
                    <select
                      value={preferences.prefEducation}
                      onChange={(e) => setPreferences({...preferences, prefEducation: e.target.value})}
                    >
                      <option value="">Select Education</option>
                      <option value="Bachelors">Bachelor's Degree</option>
                      <option value="Masters">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Annual Income</label>
                    <select
                      value={preferences.prefIncome}
                      onChange={(e) => setPreferences({...preferences, prefIncome: e.target.value})}
                    >
                      <option value="">Select Income Range</option>
                      <option value="0-5">0-5 LPA</option>
                      <option value="5-10">5-10 LPA</option>
                      <option value="10-15">10-15 LPA</option>
                      <option value="15+">15+ LPA</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-preferences">
                  <i className="fas fa-save"></i> Save Preferences
                </button>
                <button type="button" className="reset-preferences">
                  <i className="fas fa-undo"></i> Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;