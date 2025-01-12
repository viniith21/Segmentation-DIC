import React from "react";
import founder1 from "../assets/founder1.png";
import founder2 from "../assets/founder2.png";
import founder3 from "../assets/founder3.png";
import "./Founders.css"

const Founders = () => {
  const persons = [
    {
      name: "Meenal Gupta",
      designation: "Founder and CEO",
      photo: founder1,
    },
    {
      name: "Noor Fatma",
      designation: "Co-Founder and Chief Technology Officer",
      photo: founder2,
    },
    {
      name: "Sheetal Tarkas",
      designation: "Co-Founder and COO",
      photo: founder3,
    },
  ];

  return (
    <div className="container-founders" style={{marginTop:50}}>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Meet Our Founders</h2>
      </div>

      <div className="text-center mb-4">
        <div className="row">
          {persons.map((person, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={person.photo}
                      alt={`Photo of ${person.name}`}
                      className="img-fluid"
                      style={{
                        width: "100px",
                        height: "150px",
                        objectFit: "cover",
                        margin: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-start">
                      <h5 className="card-title" style={{ fontSize: "1.25rem" }}>{person.name}</h5>
                      <p className="card-text text-muted" style={{ fontSize: "1rem" }}>{person.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Founders;
