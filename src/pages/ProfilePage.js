import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // Example profile data (replace with actual data from your API/state)
  const profile = {
    name: "John Smith",
    age: 28,
    photo: "/path/to/photo.jpg", // Replace with actual photo path
    gender: "Male",
    religion: "Hindu",
    community: "Telugu",
    location: "Hyderabad, India",
    education: "Master's Degree",
    company: "Tech Solutions Inc.",
    salary: "10-15 LPA",
    about: "I am a software professional looking for a life partner who shares similar values and interests.",
    hobbies: ["Reading", "Traveling", "Photography"],
    familyDetails: {
      father: "Business",
      mother: "Homemaker",
      siblings: "1 Brother, 1 Sister"
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo-section">
          <img src={profile.photo} alt={profile.name} className="profile-photo" />
          <button className="edit-photo-btn">Update Photo</button>
        </div>
        <div className="profile-basic-info">
          <h1>{profile.name}</h1>
          <p className="profile-tagline">{profile.age} years • {profile.location}</p>
          <div className="profile-actions">
            <button className="action-btn primary">Edit Profile</button>
            <button className="action-btn">Share Profile</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>About Me</h2>
          <p>{profile.about}</p>
        </div>

        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Religion</span>
              <span className="value">{profile.religion}</span>
            </div>
            <div className="info-item">
              <span className="label">Community</span>
              <span className="value">{profile.community}</span>
            </div>
            <div className="info-item">
              <span className="label">Education</span>
              <span className="value">{profile.education}</span>
            </div>
            <div className="info-item">
              <span className="label">Profession</span>
              <span className="value">{profile.company}</span>
            </div>
            <div className="info-item">
              <span className="label">Annual Income</span>
              <span className="value">{profile.salary}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Family Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Father's Occupation</span>
              <span className="value">{profile.familyDetails.father}</span>
            </div>
            <div className="info-item">
              <span className="label">Mother's Occupation</span>
              <span className="value">{profile.familyDetails.mother}</span>
            </div>
            <div className="info-item">
              <span className="label">Siblings</span>
              <span className="value">{profile.familyDetails.siblings}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Interests & Hobbies</h2>
          <div className="hobbies-list">
            {profile.hobbies.map((hobby, index) => (
              <span key={index} className="hobby-tag">{hobby}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;