// import React from 'react';
// import './Navbar.css'; // Assuming you're using an external CSS file
// import logoimg from "../assets/logo.jpg"
// import { AiFillHome } from "react-icons/ai";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src={logoimg} alt="Logo" className="navbar-logo" />
//         <div className="navbar-name">EASIOFY</div>
//       </div>
//       <div className="navbar-right">
//         <a href="#home"><AiFillHome className='hover' /></a>
//         <a href="#login">Login</a>
//         <a href="#products">Products</a>
//         <a href="#contact">Contact Us</a>
//         <a href="#about">About Us</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import "./Navbar.css"; // Assuming you're using an external CSS file
import logoimg from "../assets/logo.jpg";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoimg} alt="Logo" className="navbar-logo" />
        <div className="navbar-name">EASIOFY</div>
      </div>
      <div className="navbar-right">
        <Link to="/">
          <AiFillHome className="hover" />
        </Link>
        <Link to="/">Login</Link>
        <a href="#products">Products</a>
        <a href="#platform">Platform</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
