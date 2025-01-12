// Feature.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Feature.css";


const Feature = ({ heading, content, image }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="image-container">
            <img src={image} alt={heading} className="feature-image" />
          </div>
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

Feature.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Feature;
