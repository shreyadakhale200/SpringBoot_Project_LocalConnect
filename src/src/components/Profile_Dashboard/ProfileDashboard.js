import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Dashboard/Footer";
const ProfileDashboard = () => {
  return (
    <div>
      {/* Add other components here, like your service grid */}
      <ProfileMain />
      <RightSide />
      <Footer />
    </div>
  );
};

export default ProfileDashboard;
