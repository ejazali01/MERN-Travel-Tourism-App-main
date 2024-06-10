import React, { useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import { MdDoNotDisturb } from "react-icons/md";
import Empty from "../components/Empty";
import { useSelector } from "react-redux";
import AllBookings from "./AllBookings";
import AddPackages from "./AddPackages";
import AllPackages from "./AllPackages";
import AllUsers from "./AllUsers";
import Payments from "./Payments";
import RatingsReviews from "./RatingsReviews";
import History from "./History";
import AdminProfile from "./AdminProfile";
import Dashboard from "./Dashboard";


const DashboardLayout = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { packageCount } = useSelector((state) => state?.package);

  const [isActive, setActive] = useState(1);

  const handleClick = (id) => {
    console.log(id);
    setActive(id);
  };

  return (
    <div className="flex justify-evenly">
      {currentUser ? (
        <>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 group-hover:text-gray-900 group-hover:scale-105 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            to=""
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-[70vh] mt-24 transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto  border-r-2 ">
              <ul className="space-y-2 font-medium">
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleClick(1);
                    }}
                    className={`${
                      isActive === 1 && "bg-gray-300"
                    } flex items-center p-2 text-gray-700 rounded-lg  group w-full hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                      />
                    </svg>
                    <span className="ms-3 group-hover:text-gray-900 group-hover:scale-105">
                      Dashboard
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(2);
                    }}
                    className={`${
                      isActive === 2 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                      />
                    </svg>

                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Bookings
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(3);
                    }}
                    className={`${
                      isActive === 3 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>

                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      All Packages
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 group-hover:text-gray-900 group-hover:scale-105 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-300">
                      {packageCount}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(4);
                    }}
                    className={`${
                      isActive === 4 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>

                    <span className="ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Users
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(5);
                    }}
                    className={`${
                      isActive === 5 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                    </svg>

                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Payments
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(6);
                    }}
                    className={`${
                      isActive === 6 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 group-hover:text-gray-900 group-hover:scale-105"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>

                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Ratings/Reviews
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(7);
                    }}
                    className={`${
                      isActive === 7 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <MdOutlineHistory />
                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      History
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      handleClick(8);
                    }}
                    className={`${
                      isActive === 8 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <span className=" ms-3 group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Profile
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          <div className="sm:ml-32 w-full overflow-y-scroll ">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="flex  h-screen mb-4 rounded bg-gray-50 ">
                {isActive === 1 ? (
                  <Dashboard />
                ) : isActive === 2 ? (
                  <AllBookings />
                ) : isActive === 3 ? (
                  <AllPackages />
                ) : isActive === 4 ? (
                  <AllUsers />
                ) : isActive === 5 ? (
                  <Payments />
                ) : isActive === 6 ? (
                  <RatingsReviews />
                ) : isActive === 7 ? (
                  <History />
                ) : isActive === 8 ? (
                  <AdminProfile />
                ) : (
                  <Empty icon={<MdDoNotDisturb />} message="Page Not Found !" />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-red-700">Login First</p>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
