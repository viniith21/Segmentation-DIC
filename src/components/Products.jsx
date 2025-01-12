// import React from 'react';
// import p1 from "../assets/p1.png"
// import p2 from "../assets/p2.png"
// const Products = () => {
//   return (
//     <div>
//       {/* Original Layout */}
//       <div className="container py-6 mb-5">
//         <div className="row flex-lg-row-reverse align-items-center g-5">
//           <div className="col-10 mx-auto col-sm-8 col-lg-6">
//             <img
//               src=""
//               className="d-block mx-lg-auto img-fluid"
//               alt="Hero Image"
//               loading="lazy"
//             />
//           </div>
//           <div className="col-lg-6">
//             <div className="mb-3">
//               <h2 className="fw-bold display-5">AI Power Connected Care</h2>
//             </div>
//             <div className="mb-3">
//               <p className="lead">
//                 AI powered assist tools tailored for radiology departments and hospitals. Real time collaborations between doctors, radiologists and care teams. HIPAA compliant platform for medical images with AI based triage support.
//               </p>
//             </div>
//             <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//               <a className="btn btn-primary px-4 me-md-2" href="#" role="button">Explore</a>
//               <a className="btn btn-outline-secondary px-4" href="#" role="button">Take a Demo</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Reversed Layout */}
//       <div className="container py-6 mb-5">
//         <div className="row flex-lg-row-reverse align-items-center g-5">
//           <div className="col-lg-6">
//             <div className="mb-3">
//               <h2 className="fw-bold display-5">AI Powered Automatic Segmentations</h2>
//             </div>
//             <div className="mb-3">
//               <p className="lead">
//                 Automatic Segmentations of ROI for surgery planning. Automatic Contouring of OAR for radiation planning.
//               </p>
//             </div>
//             <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//               <a className="btn btn-primary px-4 me-md-2" href="#" role="button">Explore</a>
//               <a className="btn btn-outline-secondary px-4" href="#" role="button">Take a Demo</a>
//             </div>
//           </div>
//           <div className="col-10 mx-auto col-sm-8 col-lg-6">
//             <img
//               src={p1}
//               className="d-block mx-lg-auto img-fluid"
//               alt="Hero Image"
//               loading="lazy"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Additional Original Layout */}
//       <div className="container py-6 mb-5">
//         <div className="row flex-lg-row-reverse align-items-center g-5">
//           <div className="col-10 mx-auto col-sm-8 col-lg-6">
//             <img
//               src={p2}
//               className="d-block mx-lg-auto img-fluid"
//               alt="Hero Image"
//               loading="lazy"

//             />
//           </div>
//           <div className="col-lg-6">
//             <div className="mb-3">
//               <h2 className="fw-bold display-5">Neuro AI</h2>
//             </div>
//             <div className="mb-3">
//               <p className="lead">
//               Brain Tumor Segmentation. Triage for TBI and stroke. Automatic Cranial Implant Generation              </p>
//             </div>
//             <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//               <a className="btn btn-primary px-4 me-md-2" href="#" role="button">Explore</a>
//               <a className="btn btn-outline-secondary px-4" href="#" role="button">Take a Demo</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Additional Reversed Layout */}
//       <div className="container py-6">
//         <div className="row flex-lg-row-reverse align-items-center g-5">
//           <div className="col-lg-6">
//             <div className="mb-3">
//               <h2 className="fw-bold display-5">Skull Reconstruction with AI</h2>
//             </div>
//             <div className="mb-3">
//               <p className="lead">

//               </p>
//             </div>
//             <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//               <a className="btn btn-primary px-4 me-md-2" href="#" role="button">Explore</a>
//               <a className="btn btn-outline-secondary px-4" href="#" role="button">Take a Demo</a>
//             </div>
//           </div>
//           <div className="col-10 mx-auto col-sm-8 col-lg-6">
//             <img
//               src="../src/assets/Screenshot 2024-08-08 224739.png"
//               className="d-block mx-lg-auto img-fluid"
//               alt="Hero Image"
//               loading="lazy"
//             />
//           </div>
//         </div>
//       </div>
//       <div style={{ margin: '40px 0', marginLeft: '190px' }}>
//   <h2 style={{ color: 'darkgreen', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}>

//   </h2>
// </div>
// {/* <div style={{ margin: '40px 0', marginLeft: '20px' }}>
//   <h2 style={{ color: 'darkgreen', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}>
//     Your Bold Dark Green Text Here
//   </h2>
// </div> */}
//     </div>

//   );
// }

// export default Products;

import React from "react";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";

import { useInView } from "react-intersection-observer";
import "./anim2.css"; // Ensure this file contains the animations
import { Link } from "react-router-dom";

const Products = () => {
  const { ref: firstRef, inView: firstInView } = useInView({
    triggerOnce: true,
  });
  const { ref: secondRef, inView: secondInView } = useInView({
    triggerOnce: true,
  });
  const { ref: thirdRef, inView: thirdInView } = useInView({
    triggerOnce: true,
  });
  const { ref: fourthRef, inView: fourthInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      {/* Original Layout */}
      <div className="container py-6 mb-5">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-10 mx-auto col-sm-8 col-lg-6">
            <img
              src={p4}
              className={`d-block mx-lg-auto img-fluid ${
                firstInView ? "slide-in-left visible" : "slide-in-left"
              }`}
              style={{ height: "400px", width: "500px" }}
              alt="Hero Image"
              loading="lazy"
              ref={firstRef}
            />
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <h2 className="fw-bold display-5">AI Power Connected Care</h2>
            </div>
            <div className="mb-3">
              <p className="lead">
                AI powered assist tools tailored for radiology departments and
                hospitals. Real time collaborations between doctors,
                radiologists and care teams. HIPAA compliant platform for
                medical images with AI based triage support.
              </p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                className="btn btn-primary px-4 me-md-2"
                to="/products"
                role="button"
              >
                Explore
              </Link>
              <Link
                className="btn btn-outline-secondary px-4"
                to="/products"
                role="button"
              >
                Take a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reversed Layout */}
      <div className="container py-6 mb-5">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-lg-6">
            <div className="mb-3">
              <h2 className="fw-bold display-5">
                AI Powered Automatic Segmentations
              </h2>
            </div>
            <div className="mb-3">
              <p className="lead">
                Automatic Segmentations of ROI for surgery planning. Automatic
                Contouring of OAR for radiation planning.
              </p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                className="btn btn-primary px-4 me-md-2"
                to="/products"
                role="button"
              >
                Explore
              </Link>
              <Link
                className="btn btn-outline-secondary px-4"
                to="/products"
                role="button"
              >
                Take a Demo
              </Link>
            </div>
          </div>
          <div className="col-10 mx-auto col-sm-8 col-lg-6">
            <img
              src={p1}
              className={`d-block mx-lg-auto img-fluid ${
                secondInView ? "slide-in-right visible" : "slide-in-right"
              }`}
              alt="Hero Image"
              loading="lazy"
              ref={secondRef}
            />
          </div>
        </div>
      </div>

      {/* Additional Original Layout */}
      <div className="container py-6 mb-5">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-10 mx-auto col-sm-8 col-lg-6">
            <img
              src={p2}
              className={`d-block mx-lg-auto img-fluid ${
                thirdInView ? "slide-in-left visible" : "slide-in-left"
              }`}
              alt="Hero Image"
              loading="lazy"
              ref={thirdRef}
            />
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <h2 className="fw-bold display-5">Neuro AI</h2>
            </div>
            <div className="mb-3">
              <p className="lead">
                Brain Tumor Segmentation. Triage for TBI and stroke. Automatic
                Cranial Implant Generation
              </p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                className="btn btn-primary px-4 me-md-2"
                to="/products"
                role="button"
              >
                Explore
              </Link>
              <Link
                className="btn btn-outline-secondary px-4"
                to="/products"
                role="button"
              >
                Take a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Reversed Layout */}
      <div className="container py-6">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-lg-6">
            <div className="mb-3">
              <h2 className="fw-bold display-5">
                Skull Reconstruction with AI
              </h2>
            </div>
            <div className="mb-3">
              <p className="lead">{/* Add description here */}</p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                className="btn btn-primary px-4 me-md-2"
                to="/products"
                role="button"
              >
                Explore
              </Link>
              <Link
                className="btn btn-outline-secondary px-4"
                to="/products"
                role="button"
              >
                Take a Demo
              </Link>
            </div>
          </div>
          <div className="col-10 mx-auto col-sm-8 col-lg-6">
            <img
              src={p3}
              className={`d-block mx-lg-auto img-fluid  ${
                fourthInView ? "slide-in-right visible" : "slide-in-right"
              }`}
              style={{ height: "400px", width: "500px" }}
              alt="Hero Image"
              loading="lazy"
              ref={fourthRef}
            />
          </div>
        </div>
      </div>
      <div style={{ margin: "40px 0", marginLeft: "190px" }}>
        <h2
          style={{
            color: "darkgreen",
            fontWeight: "bold",
            textAlign: "left",
            textDecoration: "underline",
          }}
        >
          {/* Add your text here */}
        </h2>
      </div>
    </div>
  );
};

export default Products;
