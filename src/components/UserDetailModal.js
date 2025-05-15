import React from 'react';
import './UserDetailModal.css';

const UserDetailModal = ({ user, onClose, matchPercentage = 75 }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="profile-header">
          <div className="profile-photos">
            <img src={`https://placekitten.com/400/${400 + user.id}`} alt={user.first_name} />
          </div>
          <div className="match-percentage">
            <div className="percentage-circle">
              <span>{matchPercentage}%</span>
              <p>Match</p>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h2>{user.first_name} {user.last_name}</h2>
          
          <div className="detail-section">
            <h3>Basic Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Age</span>
                <span className="value">{new Date().getFullYear() - new Date(user.date_of_birth).getFullYear()} years</span>
              </div>
              <div className="detail-item">
                <span className="label">Height</span>
                <span className="value">{Math.floor(user.height_cm/30.48)}'{Math.round((user.height_cm/2.54)%12)}"</span>
              </div>
              <div className="detail-item">
                <span className="label">Location</span>
                <span className="value">{user.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">Marital Status</span>
                <span className="value">{user.marital_status}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Professional Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Education</span>
                <span className="value">{user.education}</span>
              </div>
              <div className="detail-item">
                <span className="label">Profession</span>
                <span className="value">{user.profession}</span>
              </div>
              <div className="detail-item">
                <span className="label">Company</span>
                <span className="value">{user.company}</span>
              </div>
              <div className="detail-item">
                <span className="label">Income</span>
                <span className="value">{user.income}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Religious Background</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Religion</span>
                <span className="value">{user.religion}</span>
              </div>
              <div className="detail-item">
                <span className="label">Caste</span>
                <span className="value">{user.caste}</span>
              </div>
            </div>
          </div>

          <div className="matching-preferences">
            <h3>Preference Matching <span className="match-count">7/10 Matched</span></h3>
            <div className="preferences-comparison">
              <div className="user-preferences">
                <h4>Your Preferences</h4>
                <div className="preference-list">
                  <div className="preference-row">
                    <span>Age: 25-30 years</span>
                  </div>
                  <div className="preference-row">
                    <span>Height: 5'5" - 5'8"</span>
                  </div>
                  <div className="preference-row">
                    <span>Location: Hyderabad</span>
                  </div>
                  <div className="preference-row">
                    <span>Education: Post Graduate</span>
                  </div>
                  <div className="preference-row">
                    <span>Income: Above 8 LPA</span>
                  </div>
                  <div className="preference-row">
                    <span>Religion: Hindu</span>
                  </div>
                  <div className="preference-row">
                    <span>Caste: Any</span>
                  </div>
                  <div className="preference-row">
                    <span>Marital Status: Never Married</span>
                  </div>
                </div>
              </div>

              <div className="match-indicators">
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator not-matched"><i className="fas fa-times-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
                <div className="indicator matched"><i className="fas fa-check-circle"></i></div>
              </div>

              <div className="partner-details">
                <h4>Partner Details</h4>
                <div className="preference-list">
                  <div className="preference-row">
                    <span>{new Date().getFullYear() - new Date(user.date_of_birth).getFullYear()} years</span>
                  </div>
                  <div className="preference-row">
                    <span>{Math.floor(user.height_cm/30.48)}'{Math.round((user.height_cm/2.54)%12)}"</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.location}</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.education}</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.income}</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.religion}</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.caste}</span>
                  </div>
                  <div className="preference-row">
                    <span>{user.marital_status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="send-interest">Send Interest</button>
            <button className="shortlist">Shortlist Profile</button>
            <button className="message">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;