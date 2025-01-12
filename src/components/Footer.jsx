import React from "react";
import phoneIcon from "../assets/call.png"; // Replace with your phone icon
import emailIcon from "../assets/mail.png"; // Replace with your email icon

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#5f9ea0" }} className="text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Phone Number */}
          <div className="col-md-6 text-center mb-3 mb-md-0">
            <div>
              <img
                src={phoneIcon}
                alt="Phone Icon"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <div>
              <span>+1-234-567-8900</span>
            </div>
          </div>

          {/* Email Address */}
          <div className="col-md-6 text-center">
            <div>
              <img
                src={emailIcon}
                alt="Email Icon"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <div>
              <span>contact@easiofy.com</span>
            </div>
          </div>
        </div>

        {/* Copyright Message */}
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 Easiofy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
