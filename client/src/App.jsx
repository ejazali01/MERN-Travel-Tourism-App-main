import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PrivateRoute from "./pages/Routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/Routes/AdminRoute";
import UpdatePackage from "./pages/admin/UpdatePackage";
import Package from "./pages/Package";
import RatingsPage from "./pages/RatingsPage";
import Booking from "./pages/user/Booking";
import Search from "./pages/Search";
import Layout from "./layout";
import DashboardLayout from "./pages/admin/DashboardLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/packages" element={<Search />} />
          {/* user */}
          <Route path="/my" element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* admin */}
          <Route path="/my" element={<AdminRoute />}>
            <Route path="dashboard" element={<DashboardLayout />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route
              path="admin/update-package/:id"
              element={<UpdatePackage />}
            />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/package/:id" element={<Package />} />
          <Route path="/package/ratings/:id" element={<RatingsPage />} />
          {/* checking user auth before booking */}
          <Route path="/booking" element={<PrivateRoute />}>
            <Route path=":packageId" element={<Booking />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
