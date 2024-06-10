import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { ProfileMenu } from "./ProfileMenu";
// import defaultProfileImg from "../../assets/images/profile.png";

const Header = () => {
  // const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-white z-50 ">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-5 py-4 flex items-center justify-between space-x-12">
          <div className="flex items-center space-x-8 ">
            <Link to="/" id="logo" className="flex items-center space-x-2">
              <img
                src="/assets/img/logo.png"
                className="w-8 h-8"
                alt="Trippi Logo"
              />
              <h5 className="text-xl font-bold text-[#094067]">Trippi</h5>
            </Link>
            <div className="hidden lg:flex px-5 py-2 w-[550px] border border-gray-400 rounded-md space-x-2 focus-within:ring-2 focus-within:ring-[#3DA9FC] ring-offset-2 transition duration-300">
              <input
                className="w-full border-none outline-none"
                type="text"
                placeholder="Search for destinations, hotels, flights, etc."
              />
            </div>
          </div>
          <div className="lg:hidden">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-5">
            <ul className="px-5 py-2 flex items-center space-x-12 font-semibold text-[#094067] hover:text-[#094067]/75 transition duration-300">
              <li className="hover:border-b-4 border-b-accent hover:transition-all hover:ease-in-out hover:duration-300 font-normal ">
                <Link to="/packages">Packages</Link>
              </li>
              <li className="hover:border-b-4 border-b-accent hover:transition-all hover:ease-in-out hover:duration-300 font-normal ">
                <Link to="/about">About</Link>
              </li>
              <li >
                <ProfileMenu/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Add padding to the top of the page content to prevent it from being hidden behind the fixed navbar */}
      <div className="pt-24">
        {/* Page content goes here */}
      </div>
    </>
  );
};

export default Header;
