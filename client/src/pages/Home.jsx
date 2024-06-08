import React, { useEffect, useState } from "react";
import "./styles/Home.css";
// import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Partners from "./components/Partners";

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getTopPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=packageRating&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setTopPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLatestPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setLatestPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOfferPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
      );
      const data = await res.json();
      if (data?.success) {
        setOfferPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AOS.init();
    getTopPackages();
    getLatestPackages();
    getOfferPackages();
  }, []);

  return (
    <>
      <main className="max-w-screen-xl h-screen mx-auto overflow-hidden px-4 sm:px-5">
        <section
          data-aos="fade-up"
          data-aos-duration="1000"
          className="grid grid-cols-6 lg:grid-cols-12 mb-20"
        >
          <div className="col-span-6 text-center lg:text-left">
            <span className="inline-block px-3 py-1.5 mb-4 bg-[#3DA9FC] bg-opacity-10 text-[#3DA9FC] font-semibold tracking-wide rounded-full">
              •Healing anytime and anywhere!
            </span>
            <h1 className="text-5x sm:text-6xl md:text-7xl mb-4 font-extrabold text-[#094067] leading-tight">
              Explore the World and
              <span className="text-[#3DA9FC] pr-2"> Discover</span>
              Its Beauty
            </h1>
            <p className="mb-6 text-base md:text-lg tracking-wide leading-8 font-medium text-[#5F6C7B] pr-0 md:pr-4 xl:pr-32">
              Trippi can help you enjoy an unforgettable trip. Embark on a new
              adventure and explore the best holiday destinations around the
              world.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 justify-center lg:justify-start">
              <button
                className="flex items-center group gap-4 middle none rounded-lg bg-accent py-5 px-9 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-900/10 transition-all hover:bg-accent-hover focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                <span>Destination</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right group-hover:translate-x-1.5 transition duration-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <line x1="15" y1="16" x2="19" y2="12"></line>
                  <line x1="15" y1="8" x2="19" y2="12"></line>
                </svg>
              </button>
              <button className="w-fit px-9 py-5 flex items-center justify-center md:justify-start text-[#3DA9FC] font-semibold space-x-4 hover:scale-105 transition duration-300">
                <div className="p-4 rounded-full border border-[#3DA9FC]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="#FFFFFE" />
                    <path d="M7 4V20L20 12L7 4Z" fill="#3DA9FC" />
                  </svg>
                </div>
                <span>Our Gallery</span>
              </button>
            </div>
            <div className="top-part w-full gap-2 flex  flex-col">
              {/* <div className="w-full flex justify-center items-center gap-2 mt-8">
                <input
                  type="text"
                  className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-gray-700 placeholder:text-gray-700 font-semibold"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    navigate(`/search?searchTerm=${search}`);
                  }}
                  className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
                >
                  Go
                  <FaSearch className="" />
                </button>
              </div> */}

              <div className="w-[90%] max-w-xl flex justify-center mt-10 ">
                <button
                  onClick={() => {
                    navigate("/search?offer=true");
                  }}
                  className=" flex items-center justify-around gap-x-1 bg-accent border-3  text-white hover:bg-gray-100 hover:ring-offset-2 hover:border-gray-400 p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:text-gray-900 hover:scale-105 transition-all duration-150"
                >
                  Best Offers
                  <LuBadgePercent className="text-2xl" />
                </button>
                <button
                  onClick={() => {
                    navigate("/search?sort=packageRating");
                  }}
                  className="flex items-center justify-around gap-x-1 bg-accent border-3  text-white hover:bg-gray-100 hover:ring-offset-2 hover:border-gray-400 p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:text-gray-900 hover:scale-105 transition-all duration-150"
                >
                  Top Rated
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-2xl"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    navigate("/search?sort=createdAt");
                  }}
                  className="flex items-center justify-around gap-x-1 bg-accent border-3  text-white hover:bg-gray-100 hover:ring-offset-2 hover:border-gray-400 p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:text-gray-900 hover:scale-105 transition-all duration-150"
                >
                  Latest
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-lg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    navigate("/search?sort=packageTotalRatings");
                  }}
                  className="flex items-center justify-around gap-x-1 bg-accent border-3 border-white text-white hover:bg-gray-100 hover:ring-offset-2 hover:border-gray-400  p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s  rounded-e-full flex-1 hover:text-gray-900 hover:scale-105 transition-all duration-150"
                >
                  Most Rated
                  <FaRankingStar className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-6 hidden lg:block">
            <img
              className="w-full h-full object-cover"
              src="/assets/img/hero-image.webp"
              alt="Hero Image"
            />
          </div>
        </section>
      </main>
      {/* partners */}
      <Partners />
      {/* main page */}
      <div className="main flex flex-col gap-5">
        {loading && <h1 className="text-center text-2xl">Loading...</h1>}
        {!loading &&
          topPackages.length === 0 &&
          latestPackages.length === 0 &&
          offerPackages.length === 0 && (
            <div className="relative h-[60vh] bg-gray-200 mt-6">
              <div className="absolute flex justify-center items-center w-full h-full pt-4 bg-gray-200">
                <div className="m-auto flex flex-col justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-28 opacity-20 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  <h1 className=" text-2xl text-center">No Packages Yet!</h1>
                </div>
              </div>
            </div>
          )}
        {/* Top Rated */}
        {!loading && topPackages.length > 0 && (
          <>
            <h1 className="text-2xl font-semibold">Top Packages</h1>
            <div className="flex flex-wrap gap-2 my-3">
              {topPackages.map((packageData, i) => {
                return <PackageCard key={i} packageData={packageData} />;
              })}
            </div>
          </>
        )}
        {/* Top Rated */}
        {/* latest */}
        {!loading && latestPackages.length > 0 && (
          <>
            <h1 className="text-2xl font-semibold">Latest Packages</h1>
            <div className="flex flex-wrap gap-2 my-3">
              {latestPackages.map((packageData, i) => {
                return <PackageCard key={i} packageData={packageData} />;
              })}
            </div>
          </>
        )}
        {/* latest */}
        {/* offer */}
        {!loading && offerPackages.length > 0 && (
          <>
            <div className="offers_img"></div>
            <h1 className="text-2xl font-semibold">Best Offers</h1>
            <div className="flex flex-wrap gap-2 my-3">
              {offerPackages.map((packageData, i) => {
                return <PackageCard key={i} packageData={packageData} />;
              })}
            </div>
          </>
        )}
        {/* offer */}
      </div>
    </>
  );
};

export default Home;
