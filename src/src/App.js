// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomerLogin from './components/CustomerLogin';
import ServiceProviderLogin from './components/ServiceProviderLogin';
import CustomerDashboard from './components/CustomerDashboard';
import ServiceProviderDashboard from './components/ServiceProviderDashboard';
import CostomerSignup from './components/CustomerSignup'
import ServiceProviderSignup from './components/ServiceProviderSign'
import ProfileDashboard from './components/Profile_Dashboard/ProfileMain';
import Payment from './components/Dashboard/Payment';
import ForgotPassword from './components/Profile_Dashboard/ForgetPassword';
import UpdatePassword from './components/Profile_Dashboard/UpdatePassword';
import './styles/App.css'; // Import styles
import AboutUsPage from './components/Dashboard/AboutUSPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/service-provider-login" element={<ServiceProviderLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/payment" element={<Payment />}></Route>

          <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
          <Route path="/customer-Sign" element={<CostomerSignup />} />
          <Route path="/service-provider-Sign" element={<ServiceProviderSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          
          <Route path="/aboutus" element={<AboutUsPage />}></Route>

          <Route path="/logout" element={<logout />}></Route>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
