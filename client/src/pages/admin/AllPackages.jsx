import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { MdDoNotDisturb } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImagePlacehoderSkeleton } from "../components/skeletons/ImagePlacehoderSkeleton";
import Empty from "../components/Empty";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const getPackages = async () => {
    setPackages([]);
    try {
      setLoading(true);
      let url =
        filter === "offer" //offer
          ? `/api/package/get-packages?searchTerm=${search}&offer=true`
          : filter === "latest" //latest
          ? `/api/package/get-packages?searchTerm=${search}&sort=createdAt`
          : filter === "top" //top rated
          ? `/api/package/get-packages?searchTerm=${search}&sort=packageRating`
          : `/api/package/get-packages?searchTerm=${search}`; //all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
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
    getPackages();
  }, [filter, search]);

  const handleDelete = async (packageId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/package/delete-package/${packageId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data?.message);
      getPackages();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="rounded-lg w-full flex flex-col p-5  gap-2">
        {packages && (
          <>
            <div className="flex justify-between">
              <div className="">
                <input
                  className="p-1 rounded border min-w-72 "
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  size="sm"
                  color="blue"
                  className="flex items-center gap-2 font-bold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add Packages
                </Button>
              </div>
            </div>

            {/* tabs */}
            <Tabs value="dashboard">
              <TabsHeader>
                <Tab
                value=" All"
                  className={`cursor-pointer text-gray-800 hover:scale-95 w-full border text-center p-2 transition-all duration-300 ${
                    filter === "all" && " text-gray-800"
                  }`}
                  id="all"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  All
                </Tab>
                <Tab
                 value="Offer"
                  className={`cursor-pointer text-gray-800  hover:scale-95  w-full border text-center p-2 transition-all duration-300 ${
                    filter === "offer" && " text-gray-800"
                  }`}
                  id="offer"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  Offer
                </Tab>

                <Tab
                value="Latest"
                  className={`cursor-pointer text-gray-800 hover:scale-95 w-full border text-center p-2 transition-all duration-300 ${
                    filter === "latest" && " text-gray-800"
                  }`}
                  id="latest"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  Latest
                </Tab>

                <Tab
                 value="Top"
                  className={`cursor-pointer text-gray-800 hover:scale-95 w-full border text-center p-2 transition-all duration-300 ${
                    filter === "top" && " text-gray-800"
                  }`}
                  id="top"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  Top
                </Tab>
              </TabsHeader>
            </Tabs>
          </>
        )}
        {/* packages */}
        {loading ? (
          Array.from({ length: packages.length || 3 }).map((_, i) => (
            <ImagePlacehoderSkeleton key={i} />
          ))
        ) : packages.length > 0 ? (
          packages.map((pack, i) => {
            return (
              <div
                className="border rounded-lg w-full flex  gap-8 items-center  hover:scale-[1.02] transition-all duration-300"
                key={i}
              >
                <div className=" w-full flex p-3 gap-8 items-center  ">
                  <Link to={`/package/${pack._id}`}>
                    <img
                      src={pack?.packageImages[0]}
                      alt="image"
                      className="w-20 h-20 rounded object-cover"
                    />
                  </Link>
                  <Link to={`/package/${pack._id}`}>
                    <p className="flex flex-wrap max-w-xl font-normal hover:underline text-gray-700">
                      {pack?.packageName}
                    </p>
                  </Link>
                </div>

                <div className="flex  items-center gap-4">
                  <Link
                    to={`/profile/admin/update-package/${pack._id}`}
                    className=""
                  >
                    <button
                      disabled={loading}
                      className="text-blue-600 hover:bg-gray-200 p-3 rounded-full "
                    >
                      {loading ? (
                        "Loading..."
                      ) : (
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      )}
                    </button>
                  </Link>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(pack?._id)}
                    className="p-3 rounded-full hover:bg-gray-200 text-red-600 hover:transition-all hover:duration-300 ease-in-out"
                  >
                    {loading ? (
                      "Loading..."
                    ) : (
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          // <ImagePlacehoderSkeleton />
          <Empty icon={<MdDoNotDisturb />} message="Page Not Found !" />
        )}
      </div>
    </>
  );
};

export default AllPackages;
