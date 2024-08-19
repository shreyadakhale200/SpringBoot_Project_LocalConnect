// CustomerDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import shared styles for dashboard pages
import { getWithExpiry } from '../utils/localStorageHelper';
import NavBar from './Dashboard/Navbar';
import ServiceList from './Dashboard/ServiceList';
import Footer from './Dashboard/Footer';

const CustomerDashboard = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage with expiry check
    const savedUserId = getWithExpiry('userId');
    const savedUserName = getWithExpiry('userName');

    if (savedUserId && savedUserName) {
      setUserId(savedUserId);
      setUserName(savedUserName);
    } else {
      // If data is expired or not found, redirect to login
      navigate('/customer-login');
    }
  }, [navigate]);

  return (
    <div>
    <NavBar userId={userId}/>
    <ServiceList userId={userId}/>
    <Footer/>
    {/* Add other components here, like your service grid */}
  </div>
  );
};

export default CustomerDashboard;
