import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Update the path to your actual logo file
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/css/animated.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-chain-app-dev.css";

const Navbar = () => {
  return (
    <>
      <style>
        {`
          .header-area.header-sticky {
            min-height: 80px;
            position: fixed; /* Fixed position for sticky header */
            width: 100%; /* Ensure it spans the full width */
            background: #b9d2ffa6;
            margin: 0; /* Remove margin to avoid layout issues */
            top: 0; /* Stick to the top */
            left: 0; /* Align to the left */
            z-index: 1000; /* Ensure it's above other content */
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
  <img src={logo} alt="Logo" style={{ height: '35px', width: '35px' }} />
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
                    <a href="/aboutus">About us</a>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/profile">My Profile</Link>
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
