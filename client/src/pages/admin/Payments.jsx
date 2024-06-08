import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "../components/Empty";
import { MdDoNotDisturb } from "react-icons/md";
import { DefaultSkeleton } from "../components/skeletons/DefaultSkelaton";

const Payments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/booking/get-allBookings?searchTerm=${search}`
      );
      const data = await res.json();
      if (data?.success) {
        setAllBookings(data?.bookings);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [search]);

  return (
    <div className="w-full flex h-screen ">
      <div className="w-[95%]  rounded-lg p-3 flex flex-col gap-2">
        <h1 className="text-center text-2xl">Payments</h1>
        <div className="w-full border-b-4">
          <input
            className="border rounded-lg p-2 mb-2"
            type="text"
            placeholder="Search Username or Email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {error && <h1 className="text-center text-2xl">{error}</h1>}
        {loading ? (
          Array.from({ length: allBookings.length || 3 }).map((_, i) => (
            <DefaultSkeleton key={i} />
          ))
        ) : allBookings.length > 0 ? (
          allBookings.map((booking, i) => {
            return (
              <div
                className="w-full border-y-2 p-3 flex flex-wrap overflow-auto gap-3 items-center justify-between"
                key={i}
              >
                <Link to={`/package/${booking?.packageDetails?._id}`}>
                  <img
                    className="w-12 h-12"
                    src={booking?.packageDetails?.packageImages[0]}
                    alt="Package Image"
                  />
                </Link>
                <Link to={`/package/${booking?.packageDetails?._id}`}>
                  <p className="hover:underline">
                    {booking?.packageDetails?.packageName}
                  </p>
                </Link>
                <p>{booking?.buyer?.username}</p>
                <p>{booking?.buyer?.email}</p>
                <p>{booking?.date}</p>
                <p>${booking?.totalPrice}</p>
              </div>
            );
          })
        ) : (
          <Empty icon={<MdDoNotDisturb />} message="No Booking Available !" />
        )}
      </div>
    </div>
  );
};

export default Payments;
