import React from "react";
import pl1 from "../assets/pl1.png";
import pl2 from "../assets/pl2.png";
import pl3 from "../assets/pl3.png";
import pl4 from "../assets/pl4.png";

const Platform = () => {
  const items = [
    {
      image: pl1,
      heading: "Store Medical Scans and Reports",
      text: "Use ImagixAI as a cost-effective, reliable, and secure cloud-based PACS. No need to buy on-site expensive hardware or spend resources on maintenance and repair. Just sign up at ImagixAI and you are good to go.",
    },
    {
      image: pl2,
      heading: "Share Medical Scans and Reports",
      text: "Anytime, anywhere medical images view available on tablets and mobile. No need to use VPN to view the images and reports. Use securely on your mobile/tablet/desktop/laptop. It provides the doctors the ease to work in their spare time, while travelling. No need to wait for diagnosis.",
    },
    {
      image: pl3,
      heading: "Mobile/Tablet Viewer",
      text: "With on-premise PACS, sharing of medical images such as CT/MRI/PET is a cumbersome process. The images are shared as films or CDs which have to be carried physically for second opinions. It is difficult to collaborate among doctors who are not present in the same place physically. Use ImagixAI to share medical images and reports with doctors and patients. Just create a share link with access password and share it hassle-free with the recipient.",
    },
    {
      image: pl4,
      heading: "3D XR Viewer",
      text: "ImagixAI automates the process of creating 3D models of the CT/MRI/PET scans and allows you to visualise them. 3D models are created from the medical images which contain complete anatomical details. These models can be viewed in extreme visual detail using AR/VR or standard screens. Scans are 3D and their full potential can be utilised in mixed reality. The 3D can be used for patient information or planning surgery and future treatment.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>
        Our Platform
      </h2>
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 text-center">
              <div className="card-body">
                <img
                  src={item.image}
                  className="mb-3"
                  alt={item.heading}
                  style={{ width: "100px", height: "100px", objectFit: "contain", margin: "0 auto" }} 
                />
                <h5
                  className="card-title"
                  style={{ color: "#1E824C", fontWeight: "bold" }}
                >
                  {item.heading}
                </h5>
                <p className="card-text">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
