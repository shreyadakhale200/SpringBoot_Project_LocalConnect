// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import component-specific styles
import Navbar from './Profile_Dashboard/Navbar';
import Footer from './Dashboard/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/customer-login');
  };

  const handleServiceProviderClick = () => {
    navigate('/service-provider-login');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome!</h1>
      <p className="home-subtitle">Are you a Customer or Service Provider?</p>
      <div className="button-container">
        <button className="home-button" onClick={handleCustomerClick}>
          Customer
        </button>
        <button className="home-button" onClick={handleServiceProviderClick}>
          Service Provider
        </button>
      </div>
      <Navbar/>
      <Footer/>
    </div>
  );
};

export default Home;
