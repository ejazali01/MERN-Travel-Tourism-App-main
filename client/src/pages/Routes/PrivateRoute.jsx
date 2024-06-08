import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const authCheck = async () => {
    try {
      const res = await fetch("/api/user/user-auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.check) {
        setOk(true);
      } else {
        setOk(false);
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during auth check:", error);
      setOk(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      authCheck();
    }
  }, [currentUser]);

  return ok ? <Outlet /> : <Spinner />;
}