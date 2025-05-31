import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  // Add these state declarations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState({
    // Add profile_id to initial state
    profile_id: '',
    // Profile fields
    profile_for: '',
    gender: '',
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    education: '',
    company: '',
    salary: '',
    religion: '',
    caste: '',
    location: '',
    profession: '',
    income: '',
    marital_status: '',
    height_cm: '',
    body_type: '',
    profile_created_by: '',
    time_of_birth: '',
    place_of_birth: '',
    nakshatram: '',
    raasi: '',
    gothram: '',
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    siblings: '',
    permanent_address: '',
    native_place: '',
    settled_in: '',
    additional_roles: '',
    // Preferences
    partner_preference: '',
    min_age: '',
    max_age: '',
    pref_religion: '',
    pref_caste: '',
    pref_location: '',
    pref_education: '',
    pref_marital_status: '',
    pref_income: ''
  });
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.data); // Changed from data.user to data.data
          setProfilePhotos(data.photos || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    // Here you would typically upload to server and get URLs
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setProfilePhotos([...profilePhotos, ...newPhotos].slice(0, 3));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Reset to initial state instead of null
    setUserData({
      profile_id: '',
      // ... all other fields initialized to empty strings
    });
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
        <div className="profile-header">
          <div className="profile-photos">
            <div className="main-photo">
              {profilePhotos[0] ? (
                <img src={profilePhotos[0]} alt="Main profile" />
              ) : (
                <div className="photo-placeholder">
                  <i className="fas fa-user-circle"></i>
                </div>
              )}
            </div>
            <div className="additional-photos">
              {[1, 2].map((i) => (
                <div key={i} className="photo-thumbnail">
                  {profilePhotos[i] ? (
                    <img src={profilePhotos[i]} alt={`Additional ${i}`} />
                  ) : (
                    <div className="photo-placeholder">
                      <i className="fas fa-plus"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <label className="upload-btn">
                <input 
                  type="file" 
                  multiple 
                  onChange={handlePhotoUpload} 
                  accept="image/*"
                  max="3"
                />
                <i className="fas fa-camera"></i> Upload Photos
              </label>
            )}
          </div>

          <div className="profile-summary">
            <h2>{userData?.first_name || ''} {userData?.last_name || ''}</h2>
            
            <div className="profile-header-fields">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={userData?.last_name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="father_name"
                  value={userData?.father_name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label>Mother's Name</label>
                <input
                  type="text"
                  name="mother_name"
                  value={userData?.mother_name || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData?.email || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <p className="profile-id">ID: {userData?.profile_id || ''}</p>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="save-btn" onClick={handleSaveProfile}>Save</button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Profile For</label>
                    <select
                      name="profile_for"
                      value={userData?.profile_for || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Myself">Myself</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={userData?.gender || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={userData?.date_of_birth || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select
                      name="marital_status"
                      value={userData?.marital_status || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Unmarried">Unmarried</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      name="height_cm"
                      value={userData?.height_cm || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Body Type</label>
                    <select
                      name="body_type"
                      value={userData?.body_type || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Slim">Slim</option>
                      <option value="Average">Average</option>
                      <option value="Athletic">Athletic</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Education & Career</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Education</label>
                    <input
                      type="text"
                      name="education"
                      value={userData?.education || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={userData?.profession || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={userData?.company || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary/Income</label>
                    <input
                      type="text"
                      name="income"
                      value={userData?.income || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Family Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Father's Name</label>
                    <input
                      type="text"
                      name="father_name"
                      value={userData?.father_name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Father's Occupation</label>
                    <input
                      type="text"
                      name="father_occupation"
                      value={userData?.father_occupation || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mother's Name</label>
                    <input
                      type="text"
                      name="mother_name"
                      value={userData?.mother_name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mother's Occupation</label>
                    <input
                      type="text"
                      name="mother_occupation"
                      value={userData?.mother_occupation || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Siblings</label>
                    <input
                      type="text"
                      name="siblings"
                      value={userData?.siblings || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Astrological Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Time of Birth</label>
                    <input
                      type="time"
                      name="time_of_birth"
                      value={userData?.time_of_birth || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Place of Birth</label>
                    <input
                      type="text"
                      name="place_of_birth"
                      value={userData?.place_of_birth || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nakshatram</label>
                    <input
                      type="text"
                      name="nakshatram"
                      value={userData?.nakshatram || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Raasi</label>
                    <input
                      type="text"
                      name="raasi"
                      value={userData?.raasi || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Gothram</label>
                    <input
                      type="text"
                      name="gothram"
                      value={userData?.gothram || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-section">
              <div className="form-section">
                <h3>Partner Preferences</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age Range</label>
                    <div className="age-range">
                      <input
                        type="number"
                        name="min_age"
                        value={userData.min_age}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        name="max_age"
                        value={userData.max_age}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
                {/* Add similar form groups for all preference fields */}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h3>Account Settings</h3>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;