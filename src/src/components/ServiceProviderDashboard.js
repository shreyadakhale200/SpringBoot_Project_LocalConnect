// CustomerDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import shared styles for dashboard pages
import { getWithExpiry } from '../utils/localStorageHelper';
import NavBar from './service_provider_dashboard/Navbar';
import Booking from './Dashboard/BookingList'
import ReviewsPage from './Profile_Dashboard/Review'

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
      navigate('/service-provider-login');
    }
  }, [navigate]);

  return (
    <div>
    <NavBar />
    <Booking userId={userId}/>
    {/* Add other components here, like your service grid */}
    <ReviewsPage />

  </div>
  );
};

export default CustomerDashboard;
