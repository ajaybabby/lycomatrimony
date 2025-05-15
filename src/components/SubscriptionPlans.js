import React from 'react';
import './SubscriptionPlans.css';

const SubscriptionPlans = ({ onClose, onSubscribe }) => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'month',
      features: ['5 Interests per day', 'Basic Search', 'View Public Photos'],
      color: '#6c757d'
    },
    {
      name: 'Basic',
      price: '₹999',
      period: 'month',
      features: ['15 Interests per day', 'Advanced Search', 'View Private Photos', 'Chat with Matches'],
      color: '#4CAF50'
    },
    {
      name: 'Standard',
      price: '₹1,999',
      period: 'month',
      features: ['30 Interests per day', 'Priority Listing', 'Video Calls', 'Read Receipts'],
      color: '#2196F3'
    },
    {
      name: 'Advanced',
      price: '₹2,999',
      period: 'month',
      features: ['Unlimited Interests', 'Profile Highlights', 'Relationship Advisor', 'Background Verification'],
      color: '#9C27B0'
    },
    {
      name: 'Royal',
      price: '₹4,999',
      period: 'month',
      features: ['All Advanced Features', 'Personal Matchmaker', 'Priority Support', 'Success Story Feature'],
      color: '#FF9800'
    }
  ];

  return (
    <div className="subscription-overlay">
      <div className="subscription-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="subscription-header">
          <h2>Choose Your Perfect Plan</h2>
          <p>Unlock premium features to find your perfect match</p>
        </div>
        
        <div className="plans-container">
          {plans.map((plan) => (
            <div className="plan-card" key={plan.name} style={{'--plan-color': plan.color}}>
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="subscribe-btn"
                onClick={() => onSubscribe(plan.name)}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;