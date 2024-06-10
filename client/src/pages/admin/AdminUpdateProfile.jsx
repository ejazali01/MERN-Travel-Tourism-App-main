import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePassStart,
  updatePassSuccess,
  updatePassFailure,
} from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import { Button, Spinner } from "@material-tailwind/react";

const AdminUpdateProfile = ({
  open,
  setOpen,
  setChangePassword,
  changePassword,
}) => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    avatar: "",
  });
  const [updatePassword, setUpdatePassword] = useState({
    oldpassword: "",
    newpassword: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePass = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    if (
      currentUser.username === formData.username &&
      currentUser.address === formData.address &&
      currentUser.phone === formData.phone
    ) {
      toast.error("Change atleast 1 field to update details");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false && res.status !== 201 && res.status !== 200) {
        dispatch(updateUserSuccess());
        dispatch(updateUserFailure(data?.messsage));
        toast.error("Session Ended! Please login again");
        navigate("/login");
        return;
      }
      if (data.success && res.status === 201) {
        toast.success(data?.message);
        setOpen(false);
        dispatch(updateUserSuccess(data?.user));
        return;
      }
      dispatch(updatePassFailure(data?.message));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();
    if (
      updatePassword.oldpassword === "" ||
      updatePassword.newpassword === ""
    ) {
      toast.error("Enter a valid password");
      return;
    }
    if (updatePassword.oldpassword === updatePassword.newpassword) {
      toast.error("New password can't be same!");
      return;
    }
    try {
      dispatch(updatePassStart());
      const res = await fetch(`/api/user/update-password/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePassword),
      });
      const data = await res.json();
      if (data.success === false && res.status !== 201 && res.status !== 200) {
        dispatch(updateUserSuccess());
        dispatch(updatePassFailure(data?.message));
        toast.error("Session Ended! Please login again");
        navigate("/login");
        return;
      }

      if (data.success && res.status === 201) {
        toast.success(data?.message);
        dispatch(updatePassSuccess());
        setUpdatePassword({
          oldpassword: "",
          newpassword: "",
        });
        setChangePassword(false);
      }
      dispatch(updatePassFailure(data?.message));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {open === true && (
        <div
          data-dialog-backdrop="sign-in-dialog"
          data-dialog-backdrop-close="true"
          className=" fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-white bg-opacity-0  backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <form onSubmit={updateUserDetails}>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-between">
                  <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Update Profile
                  </h4>

                  <button
                    className="flex justify-center items-center h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-800 bg-gray-200/20 transition-all hover:bg-gray-300/50 active:bg-gray-300/50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <p className="block mb-3 text-center font-sans text-base antialiased font-normal leading-relaxed text-red-500">
                  {error}
                </p>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Your Username
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    username
                  </label>
                </div>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Your Address
                </h6>
                <div className="">
                  <div className="relative w-full min-w-[200px]">
                    <textarea
                      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Address
                    </label>
                  </div>
                </div>

                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Your Phone
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    phone
                  </label>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button
                  type="submit"
                  size="md"
                  disabled={loading}
                  className="mt-6 flex justify-center items-center bg-accent"
                  fullWidth
                >
                  {loading ? (
                    <>
                      <div className="flex items-center gap-4 justify-center">
                        <Spinner className="h-6 w-6" color="black" />
                        <h1 className="text-black">Updating...</h1>
                      </div>
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* change password form */}

      {changePassword && (
        <div
          data-dialog-backdrop="sign-in-dialog"
          data-dialog-backdrop-close="true"
          className=" fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-white bg-opacity-0  backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <form onSubmit={updateUserPassword}>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-between">
                  <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Change Password
                  </h4>

                  <button
                    className="flex justify-center items-center h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-800 bg-gray-200/20 transition-all hover:bg-gray-300/50 active:bg-gray-300/50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setChangePassword(false)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <p className="block mb-3 text-center font-sans text-base antialiased font-normal leading-relaxed text-red-500">
                  {error}
                </p>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Your Old Password
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="text"
                    name="oldpassword"
                    value={updatePassword.oldpassword}
                    onChange={handlePass}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    password
                  </label>
                </div>

                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Your New Password
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="text"
                    name="newpassword"
                    value={updatePassword.newpassword}
                    onChange={handlePass}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    password
                  </label>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button
                  type="submit"
                  size="md"
                  disabled={loading}
                  className="mt-6 flex justify-center items-center bg-accent"
                  fullWidth
                >
                  {loading ? (
                    <>
                      <div className="flex items-center gap-4 justify-center">
                        <Spinner className="h-6 w-6" color="black" />
                        <h1 className="text-black">Changing...</h1>
                      </div>
                    </>
                  ) : (
                    "Change"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdateProfile;
