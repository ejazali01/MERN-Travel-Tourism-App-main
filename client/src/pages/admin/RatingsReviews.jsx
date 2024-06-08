import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImagePlacehoderSkeleton } from "../components/skeletons/ImagePlacehoderSkeleton";
import Empty from "../components/Empty";
import { MdDoNotDisturb } from "react-icons/md";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const RatingsReviews = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const getPackages = async () => {
    setPackages([]);
    try {
      setLoading(true);
      let url =
        filter === "most" //most rated
          ? `/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings`
          : `/api/package/get-packages?searchTerm=${search}&sort=packageRating`; //all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      if (data?.packages?.length > 8) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [filter, search]);

  const onShowMoreSClick = async () => {
    const numberOfPackages = packages.length;
    const startIndex = numberOfPackages;
    let url =
      filter === "most" //most rated
        ? `/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings&startIndex=${startIndex}`
        : `/api/package/get-packages?searchTerm=${search}&sort=packageRating&startIndex=${startIndex}`; //all
    const res = await fetch(url);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setPackages([...packages, ...data?.packages]);
  };

  return (
    <>
      <div className=" rounded-lg w-full flex flex-col p-5  gap-2 h-screen">
        {packages && (
          <>
            <div>
              <input
                className="p-1 rounded border min-w-72 max-w-96"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <Tabs value="dashboard">
              <TabsHeader>
                <Tab
                  value="All"
                  className={`w-full flex text-center text-gray-800 cursor-pointer gap-2  hover:scale-95 border p-2 transition-all duration-300 ${
                    filter === "all" && " text-gray-800 "
                  }`}
                  id="all"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  All
                </Tab>

                <Tab
                  value="Most Rated"
                  className={`w-full text-centertext-gray-800 cursor-pointer hover:scale-95 border  p-2 transition-all duration-300 ${
                    filter === "most" && "text-gray-800 flex"
                  }`}
                  id="most"
                  onClick={(e) => {
                    setFilter(e.target.id);
                  }}
                >
                  Most Rated
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
                className="border rounded-lg w-full flex  justify-between gap-2 flex-wrap items-center hover:scale-[1.02] transition-all duration-300"
                key={i}
              >
                <div className="flex gap-6 items-center">
                <Link to={`/package/ratings/${pack._id}`}>
                  <img
                    src={pack?.packageImages[0]}
                    alt="image"
                    className="w-20 h-20 rounded"
                  />
                </Link>

                <Link to={`/package/ratings/${pack._id}`}>
                  <p className="font-semibold hover:underline">
                    {pack?.packageName}
                  </p>
                </Link>
                </div>
                <p className="flex items-center">
                  <Rating
                    value={pack?.packageRating}
                    precision={0.1}
                    readOnly
                  />
                  ({pack?.packageTotalRatings})
                </p>
              </div>
            );
          })
        ) : (
          <Empty icon={<MdDoNotDisturb />} message="Page Not Found !" />
        )}

        {showMoreBtn && (
          <button
            onClick={onShowMoreSClick}
            className="text-sm bg-green-700 text-white hover:underline p-2 m-3 rounded text-center w-max"
          >
            Show More
          </button>
        )}
      </div>
    </>
  );
};

export default RatingsReviews;
