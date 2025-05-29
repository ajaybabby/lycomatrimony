import React from 'react';
import './UserDetailModal.css';

const UserDetailModal = ({ user, onClose, onAccept, onDecline, onSendInterest }) => {
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{user.first_name} {user.last_name}</h2>
          <p>{calculateAge(user.date_of_birth)} years • {user.location}</p>
          {user.match_score !== undefined && user.match_score !== null && <div className="match-score">Match Score: {user.match_score}/10</div>}
        </div>

        <div className="modal-body">
          <div className="user-photo-container"> {/* Added container for photo */}
            <img 
              src={`https://placekitten.com/400/${400 + user.id}`} 
              alt={`${user.first_name} ${user.last_name}`} 
            />
            {user.body_type && <p className="body-type">{user.body_type}</p>}
          </div>

          <div className="user-details">
            <div className="detail-section">
              <h3>Basic Information</h3>
              {user.profile_for && <p><strong>Profile For:</strong> {user.profile_for}</p>}
              {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
              {user.date_of_birth && <p><strong>Age:</strong> {calculateAge(user.date_of_birth)}</p>}
              {user.height_cm && <p><strong>Height:</strong> {user.height_cm} cm</p>}
              {user.marital_status && <p><strong>Marital Status:</strong> {user.marital_status}</p>}
              {user.body_type && <p><strong>Body Type:</strong> {user.body_type}</p>}
            </div>

            <div className="detail-section">
              <h3>Professional Details</h3>
              {user.education && <p><strong>Education:</strong> {user.education}</p>}
              {user.profession && <p><strong>Profession:</strong> {user.profession}</p>}
              {user.company && <p><strong>Company:</strong> {user.company}</p>}
              {user.salary && <p><strong>Salary:</strong> ₹{user.salary}</p>}
              {user.income && <p><strong>Income:</strong> {user.income}</p>}
            </div>

            <div className="detail-section">
              <h3>Family & Background</h3>
              {user.religion && <p><strong>Religion:</strong> {user.religion}</p>}
              {user.caste && <p><strong>Caste:</strong> {user.caste}</p>}
              {user.father_name && <p><strong>Father's Name:</strong> {user.father_name}</p>}
              {user.father_occupation && <p><strong>Father's Occupation:</strong> {user.father_occupation}</p>}
              {user.mother_name && <p><strong>Mother's Name:</strong> {user.mother_name}</p>}
              {user.mother_occupation && <p><strong>Mother's Occupation:</strong> {user.mother_occupation}</p>}
              {user.siblings && <p><strong>Siblings:</strong> {user.siblings}</p>}
            </div>

            <div className="detail-section">
              <h3>Astrological Details</h3>
              {user.time_of_birth && <p><strong>Time of Birth:</strong> {user.time_of_birth}</p>}
              {user.place_of_birth && <p><strong>Place of Birth:</strong> {user.place_of_birth}</p>}
              {user.nakshatram && <p><strong>Nakshatram:</strong> {user.nakshatram}</p>}
              {user.raasi && <p><strong>Raasi:</strong> {user.raasi}</p>}
              {user.gothram && <p><strong>Gothram:</strong> {user.gothram}</p>}
            </div>

            {user.partner_preference && (
              <div className="detail-section">
                <h3>Partner Preferences</h3>
                <p>{user.partner_preference}</p>
              </div>
            )}

            <div className="detail-section">
              <h3>Additional Information</h3>
              {user.permanent_address && <p><strong>Permanent Address:</strong> {user.permanent_address}</p>}
              {user.native_place && <p><strong>Native Place:</strong> {user.native_place}</p>}
              {user.settled_in && <p><strong>Settled In:</strong> {user.settled_in}</p>}
              {user.additional_roles && <p><strong>Additional Roles:</strong> {user.additional_roles}</p>}
            </div>

            <div className="detail-section">
              <h3>Match Compatibility</h3>
              {user.gender_match !== undefined && <p><strong>Gender Match:</strong> {user.gender_match ? '✓' : '✗'}</p>}
              {user.age_match !== undefined && <p><strong>Age Match:</strong> {user.age_match ? '✓' : '✗'}</p>}
              {user.religion_match !== undefined && <p><strong>Religion Match:</strong> {user.religion_match ? '✓' : '✗'}</p>}
              {user.caste_match !== undefined && <p><strong>Caste Match:</strong> {user.caste_match ? '✓' : '✗'}</p>}
              {user.location_match !== undefined && <p><strong>Location Match:</strong> {user.location_match ? '✓' : '✗'}</p>}
              {user.education_match !== undefined && <p><strong>Education Match:</strong> {user.education_match ? '✓' : '✗'}</p>}
              {user.marital_status_match !== undefined && <p><strong>Marital Status Match:</strong> {user.marital_status_match ? '✓' : '✗'}</p>}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {user.interest_status === 'pending' ? (
            <button className="btn btn-disabled" disabled>Interest Sent</button>
          ) : user.interest_status === 'received' ? (
            <div className="action-buttons">
              <button className="btn btn-accept" onClick={onAccept}>Accept</button>
              <button className="btn btn-decline" onClick={onDecline}>Decline</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onSendInterest}>Send Interest</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;