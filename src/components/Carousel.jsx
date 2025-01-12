import React, { useEffect, useRef } from 'react';
import './Carousel.css'; // Import your CSS file
import c1 from "../assets/c1.jpg"
import c2 from "../assets/c2.jpg"
import c3 from "../assets/c3.jpg"
import c4 from "../assets/c4.jpg"
const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let index = 0;

    const moveToNextSlide = () => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      index = (index + 1) % slides.length;
      carousel.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth',
      });
    };

    const interval = setInterval(moveToNextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-slide">
          <img src={c1} alt="Slide 1" />
        </div>
        <div className="carousel-slide">
          <img src={c2} alt="Slide 2" />
        </div>
        <div className="carousel-slide">
          <img src={c3} alt="Slide 3" />
        </div>
        <div className="carousel-slide">
          <img src={c4} alt="Slide 4" />
        </div>
        {/* Add more slides as needed */}
      </div>
    </div>
  );
};

export default Carousel;
