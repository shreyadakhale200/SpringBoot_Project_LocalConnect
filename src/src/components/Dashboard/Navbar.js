import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Update the path to your actual logo file
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/css/animated.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-chain-app-dev.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [editableData, setEditableData] = useState({});
  
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsModalOpen(true);
    fetchProfileData();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchProfileData = () => {
    // Replace with your actual GET API URL
    fetch('https://api.example.com/user-profile')
      .then(response => response.json())
      .then(data => {
        setProfileData(data);
        setEditableData(data); // Prefill the form
      })
      .catch(error => console.error('Error fetching profile data:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Replace with your actual POST API URL
    fetch('https://api.example.com/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editableData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile updated:', data);
        setIsModalOpen(false); // Close modal after successful submission
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <>
      <style>
        {`
          .header-area.header-sticky {
            min-height: 80px;
            position: absolute;
            background: #b9d2ffa6;
            margin:2px 2px 2px 2px;
          }
        `}
      </style>

      <header
        className="header-area header-sticky wow slideInDown"
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <Link to="/" className="logo">
  <img src={logo} alt="Logo" style={{ height: '55px', width: '55px' }} />
</Link>

                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <Link to="/customer-Dashboard" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/aboutus">About us</Link>
                  </li>
                  <li className="scroll-to-section">
                  <Link onClick={handleProfileClick} to="/">
                            My Profile
                  </Link>
                  </li>

                  <li>
                    <div className="gradient-button">
                      <Link to="/customer-login" id="modal_trigger">
                        <i className="fa fa-sign-in-alt"></i> Log out
                      </Link>
                    </div>
                  </li>
                </ul>

                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;