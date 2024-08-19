import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./profile.css"; // Import the CSS file
import RightSide from "./Right_side";
import axios from "axios";
import Footer from "../Dashboard/Footer";

const ProfileMain = () => {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    pinCode: "",
    gender: "",
  });
  const [userId, setUserId] = useState(null); // Assume you fetch/set userId from session or context

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch the user ID from session or context
    // This is a placeholder; replace with actual user ID fetching logic
    setUserId(1); // Replace with actual user ID fetching logic
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch user details to populate the form fields
      axios
        .get(`http://localhost:3002/api/v1/user/${userId}`)
        .then((response) => {
          const userData = response.data;
          setProfile({
            email: userData.email || "",
            password: "", // Assume password is managed separately
            name: userData.name || "",
            address: userData.address || "",
            pinCode: userData.pin_code || "",
            gender: userData.gender || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3002/api/v1/user/updateById/${userId}`, profile)
      .then((response) => {
        console.log("Profile updated:", response.data);
        navigate("/customer-dashboard"); // Redirect on success
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="profile-dashboard-container">
      <Navbar />
      <div className="profile-form-container">
        <h2 className="profile-title" style={{ textAlign: "center" }}>
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Pin Code"
              name="pinCode"
              value={profile.pinCode}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Update Profile
          </button>
        </form>
      </div>
      {userId && <RightSide userId={userId} />} {/* Pass userId to RightSide */}
      <Footer/>
    </div>
  );
};

export default ProfileMain;
