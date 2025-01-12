// Features.jsx
import React from "react";
import Feature from "./Feature";
import "./Features.css";
import f1 from "../assets/f1.png";
import f2 from "../assets/f2.png";
import f3 from "../assets/f3.png";
const Features = () => {
  const featureData = [
    {
      heading: "Remote Collaboration",
      content:
        "From accelerating patient access and adherence and closing gaps in patient care to clinical trial enrollment, we've got you covered with AI-powered tools for life sciences.",
      image: f1, // Adjust the path to where your images are stored
    },
    {
      heading: "Anywhere, Anytime Access",
      content:
        "Get connected within seconds of suspected disease wherever and without delay on a mobile or desktop device. Activate teams and improve patient access to life-saving treatments.",
      image: f2,
    },
    {
      heading: "AI Driven Precision",
      content:
        "Smart. Simple. Supportive. Equipped with dedicated 24/7 on-call clinical specialists, implementation experts, and customer success team, we are always here to assist you.",
      image:f3,
    },
  ];

  return (
    <main className="container mt-5">
      <div className="row">
        {featureData.map((feature, index) => (
          <Feature
            key={index}
            heading={feature.heading}
            content={feature.content}
            image={feature.image}
          />
        ))}
      </div>
    </main>
  );
};

export default Features;
