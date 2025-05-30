import React from 'react';
import './registrationmodal.css';

const RegistrationModal = ({ 
  showModal, 
  setShowModal, 
  currentStep, 
  setCurrentStep,
  selectedProfile,
  setSelectedProfile,
  selectedGender,
  setSelectedGender,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dateOfBirth,
  setDateOfBirth,
  education,
  setEducation,
  company,
  setCompany,
  salary,
  setSalary
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmitProfile = async () => {
    try {
      const formData = {
        profileFor: selectedProfile,
        gender: selectedGender,
        firstName,
        lastName,
        dateOfBirth: `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`,
        education,
        company,
        salary,
        email,
        password
      };

      const response = await fetch('http://localhost:5000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Profile created successfully!');
        setShowModal(false);
        // Reset form
        setCurrentStep(1);
        setSelectedProfile('Myself');
        setSelectedGender('Male');
        setFirstName('');
        setLastName('');
        setDateOfBirth({ day: '', month: '', year: '' });
        setEducation('');
        setCompany('');
        setSalary('');
        setEmail('');
        setPassword('');
      } else {
        throw new Error('Failed to create profile');
      }
    } catch (error) {
      alert('Error creating profile: ' + error.message);
    }
  };






  return showModal ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
        
        {currentStep === 1 && (
          <>
            <div className="modal-header">
              <h2>This Profile is for</h2>
            </div>
            <div className="profile-options">
              <div className="option-group">
                <button 
                  className={`option-btn ${selectedProfile === 'Myself' ? 'active' : ''}`}
                  onClick={() => setSelectedProfile('Myself')}
                >
                  <i className="fas fa-user"></i>
                  Myself
                </button>
                <button 
                  className={`option-btn ${selectedProfile === 'My Son' ? 'active' : ''}`}
                  onClick={() => setSelectedProfile('My Son')}
                >
                  <i className="fas fa-child"></i>
                  My Son
                </button>
                <button className="option-btn">
                  <i className="fas fa-female"></i>
                  My Daughter
                </button>
                <button className="option-btn">
                  <i className="fas fa-user-friends"></i>
                  My Brother
                </button>
              </div>
              <div className="option-group">
                <button className="option-btn">
                  <i className="fas fa-female"></i>
                  My Sister
                </button>
                <button className="option-btn">
                  <i className="fas fa-users"></i>
                  My Friend
                </button>
                <button className="option-btn">
                  <i className="fas fa-user-friends"></i>
                  My Relative
                </button>
              </div>
              <div className="gender-section">
                <h3>Gender</h3>
                <div className="gender-options">
                  <button 
                    className={`gender-btn ${selectedGender === 'Male' ? 'active' : ''}`}
                    onClick={() => setSelectedGender('Male')}
                  >
                    Male
                  </button>
                  <button 
                    className={`gender-btn ${selectedGender === 'Female' ? 'active' : ''}`}
                    onClick={() => setSelectedGender('Female')}
                  >
                    Female
                  </button>
                </div>
              </div>
              <button className="lets-begin-btn" onClick={() => setCurrentStep(2)}>
                Continue
              </button>
            </div>
          </>
        )}
        
        {currentStep === 2 && (
          <>
            <div className="modal-header">
              <h2>Your religion</h2>
            </div>
            <div className="profile-options">
              <div className="form-group">
                <label>Religion</label>
                <select className="form-select">
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Buddhist</option>
                  <option>Jain</option>
                </select>
              </div>
              <div className="form-group">
                <label>Community</label>
                <select className="form-select">
                  <option>Telugu</option>
                  <option>Tamil</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                </select>
              </div>
              <div className="form-group">
                <label>Country</label>
                <select className="form-select">
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>
              <button className="lets-begin-btn" onClick={() => setCurrentStep(3)}>Continue</button>
            </div>
          </>
        )}
        
        {currentStep === 3 && (
          <>
            <div className="modal-header">
              <h2>{selectedGender === 'Male' ? 'His' : 'Her'} details</h2>
            </div>
            <div className="profile-options">
              <div className="form-group">
                <label>First name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
              <div className="form-group">
                <label>Date of birth</label>
                <div className="date-inputs">
                  <input 
                    type="text" 
                    placeholder="DD" 
                    maxLength="2"
                    value={dateOfBirth.day}
                    onChange={(e) => setDateOfBirth({...dateOfBirth, day: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="MM" 
                    maxLength="2"
                    value={dateOfBirth.month}
                    onChange={(e) => setDateOfBirth({...dateOfBirth, month: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="YYYY" 
                    maxLength="4"
                    value={dateOfBirth.year}
                    onChange={(e) => setDateOfBirth({...dateOfBirth, year: e.target.value})}
                  />
                </div>
              </div>
              <button className="lets-begin-btn" onClick={() => setCurrentStep(5)}>
                Continue
              </button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="modal-header">
              <h2>Education & Work Details</h2>
            </div>
            <div className="profile-options">
              <div className="form-group">
                <label>Highest Qualification</label>
                <select 
                  className="form-select"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="">Select Education</option>
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">Ph.D.</option>
                  <option value="diploma">Diploma</option>
                </select>
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name if working"
                />
              </div>
              <div className="form-group">
                <label>Annual Income</label>
                <select 
                  className="form-select"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                >
                  <option value="">Select Income Range</option>
                  <option value="0-3">Below 3 LPA</option>
                  <option value="3-5">3-5 LPA</option>
                  <option value="5-7">5-7 LPA</option>
                  <option value="7-10">7-10 LPA</option>
                  <option value="10-15">10-15 LPA</option>
                  <option value="15+">Above 15 LPA</option>
                </select>
              </div>
              <button className="lets-begin-btn" onClick={handleSubmitProfile}>Submit Profile</button>
            </div>
          </>
        )}
        
        {currentStep === 5 && (
          <>
            <div className="modal-header">
              <h2>Create Your Account</h2>
            </div>
            <div className="profile-options">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
              <button className="lets-begin-btn" onClick={handleSubmitProfile}>
                Complete Registration
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default RegistrationModal;