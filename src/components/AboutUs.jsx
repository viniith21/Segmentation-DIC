import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import newPhoto from '../assets/aboutus.jpg'; // Import the new photo

const AboutUs = () => {
  const headingStyle = {
    fontSize: '2rem',  // Adjust the size as needed
    fontWeight: 'bold',
    color: '#000000',  // Bootstrap's green color, adjust if needed
    textAlign: 'left',
    marginLeft: '0px'  // Adjust the margin to shift the text to the left
  };

  return (
    <div className="container py-6 mb-5">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-10 mx-auto col-sm-8 col-lg-6">
          <img 
            src={newPhoto} 
            className="d-block mx-lg-auto img-fluid" 
            alt="AI Power Connected Care" 
            loading="lazy" 
          />
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <h2 className="fw-bold display-5">About Us</h2>
          </div>
          <div className="mb-3">
            <p className="lead">
              Easiofy is at the forefront of AI innovation in medical imaging, uniting expertise in artificial intelligence, mixed reality and healthcare to provide cutting-edge solutions. Committed to precision and personalized care, we provide transformative technologies to redefine diagnostic and treatment planning standards and enhance patient outcomes globally.
            </p>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            
          </div>
        </div>
      </div>


    </div>
  );
}

export default AboutUs;
