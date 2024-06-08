import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Partners = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-duration="700"
        className="w-full flex flex-col lg:flex-row items-center justify-center space-y-11 lg:space-y-0 lg:space-x-11 py-12 mb-24"
      >
        <Link to="https://www.agoda.com/en-in?ds=pAsxaZlV%2FM3%2FlDyF">
          <img
            src="assets/img/partners/agoda.png"
            className="h-[56px] lg:h-[35px] grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition duration-500"
            alt=""
          />
        </Link>

        <Link to="https://www.tripadvisor.in/">
          <img
            src="assets/img/partners/tripadvisor.png"
            className="h-[56px] lg:h-[35px] grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition duration-500"
            alt=""
          />
        </Link>

        <Link to="https://aslilokal.dev.pegipegi.com/">
          <img
            src="assets/img/partners/pegipegi.svg"
            className="h-[56px] lg:h-[35px] grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition duration-500"
            alt=""
          />
        </Link>

        <Link to="https://www.reddoorz.com/en-id/">
          <img
            src="assets/img/partners/reddorz.png"
            className="h-[56px] lg:h-[35px] grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition duration-500"
            alt=""
          />
        </Link>

        <Link to="https://www.traveloka.com/en-en">
          <img
            src="assets/img/partners/traveloka.png"
            className="h-[56px] lg:h-[35px] grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition duration-500"
            alt=""
          />
        </Link>
      </section>
    </>
  );
};

export default Partners;
