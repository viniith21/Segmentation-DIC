// // import React from 'react'
// // import Features from '../components/Features'
// // import Products from '../components/Products'
// // import Platform from '../components/Platform'
// // import AboutUs from '../components/AboutUs'
// // import Achievements from '../components/Achievements'
// // import Founders from '../components/Founders'
// // import Footer from '../components/Footer'
// // import Navbar from '../components/Navbar'

// // const Home = () => {
// //   return (
// //     <div>
// //     <Navbar/>
// //       <Features/>
// //       <Products/>
// //       <Platform/>
// //      <AboutUs/>
// //      <Achievements/>
// //      <Founders/>
// //      <Footer/>
// //     </div>
// //   )
// // }

// // export default Home

// import React from "react";
// import Features from "../components/Features";
// import Products from "../components/Products";
// import Platform from "../components/Platform";
// import AboutUs from "../components/AboutUs";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Achievements from "../components/Achievements";
// import Founders from "../components/Founders";
// import Carousel from "../components/Carousel";

// const Home = () => {
//   return (
//     <div>
//       <Navbar />
//       <Carousel/>
//       <section id="home">
//         <Features />
//       </section>

//       <section id="products">
//         <Products />
//       </section>
//       <section id="platform">
//         <Platform />
//       </section>
//       <section id="about">
//         <AboutUs />
//       </section>
//       <Achievements />
//       <Founders />
//       <section id="contact">
//         <Footer />
//       </section>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Features from "../components/Features";
import Products from "../components/Products";
import Platform from "../components/Platform";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Achievements from "../components/Achievements";
import Founders from "../components/Founders";
import Carousel from "../components/Carousel";
import { useInView } from "react-intersection-observer";
import "./animations.css";

const Home = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
  });
  const { ref: productsRef, inView: productsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: platformRef, inView: platformInView } = useInView({
    triggerOnce: true,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
  });
  const { ref: achievementsRef, inView: achievementsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: foundersRef, inView: foundersInView } = useInView({
    triggerOnce: true,
  });
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
  }); // Add this line

  return (
    <div>
      <Navbar />
      <Carousel />
      <section
        id="home"
        ref={featuresRef}
        className={`fade-in ${featuresInView ? "visible" : ""}`}
      >
        <Features />
      </section>

      <section
        id="products"
        ref={productsRef}
        className={`fade-in ${productsInView ? "visible" : ""}`}
      >
        <Products />
      </section>

      <section
        id="platform"
        ref={platformRef}
        className={`fade-in ${platformInView ? "visible" : ""}`}
      >
        <Platform />
      </section>

      <section
        id="about"
        ref={aboutRef}
        className={`fade-in ${aboutInView ? "visible" : ""}`}
      >
        <AboutUs />
      </section>

      <section
        ref={achievementsRef}
        className={`slide-up ${achievementsInView ? "visible" : ""}`}
      >
        <Achievements />
      </section>

      <section
        ref={foundersRef}
        className={`slide-up ${foundersInView ? "visible" : ""}`}
      >
        <Founders />
      </section>

      <section
        id="contact"
        ref={footerRef}
        className={`fade-in ${footerInView ? "visible" : ""}`}
      >
        <Footer />
      </section>
    </div>
  );
};

export default Home;
