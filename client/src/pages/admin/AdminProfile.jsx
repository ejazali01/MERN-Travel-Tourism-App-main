import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import "./styles/DashboardStyle.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`); //profile-photos - folder name in firebase
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //   console.log(progress);
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      alert(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure ? the account will be permenantly deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        alert(data?.message);
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="flex w-full flex-wrap max-sm:flex-col p-2">
        {currentUser ? (
          <div className="w-full p-3 max-sm:w-full">
            <div className="flex flex-col  gap-4 p-3 ">
              <div className="w-full flex justify-between bg-gray-300 p-2 rounded-md">
                <div className="flex gap-6">
                  <div className="border max-w-34">
                    <div className="w-full flex flex-col  relative">
                      <img
                        src={
                          (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                          formData.avatar
                        }
                        alt="Profile photo"
                        className="w-32 min-h-20 max-h-32 rounded-sm"
                        onClick={() => fileRef.current.click()}
                        onMouseOver={() => {
                          document
                            .getElementById("photoLabel")
                            .classList.add("block");
                        }}
                        onMouseOut={() => {
                          document
                            .getElementById("photoLabel")
                            .classList.remove("block");
                        }}
                      />
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        hidden
                        ref={fileRef}
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                      />
                      <label
                        htmlFor="photo"
                        id="photoLabel"
                        className="w-32 bg-slate-300 absolute bottom-0 p-2 text-center text-lg text-white font-semibold rounded-b-lg"
                        hidden
                      >
                        Choose Photo
                      </label>
                    </div>
                    {profilePhoto && (
                      <div className="flex w-full justify-between gap-1">
                        <button
                          onClick={() => handleProfilePhoto(profilePhoto)}
                          className="bg-green-700 p-2 text-white mt-3 flex-1 hover:opacity-90"
                        >
                          {loading
                            ? `Uploading...(${photoPercentage}%)`
                            : "Upload"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="leading-4 flex flex-col gap-2">
                    <p className="text-3xl font-semibold ">
                      Hi {currentUser.username} !
                    </p>
                    <p className="text-sm font-normal">
                      Email: {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="w-fullflex justify-between px-1">
                  <button
                    onClick={() => setActivePanelId(8)}
                    className="text-blue-500 text-lg self-end bg-gray-300 p-1 rounded-lg hover:bg-gray-400"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    
                  </button>
                </div>
                
              </div>

              <div className="w-full p-3 break-all border-t-2 border-gray-900 border-dotted">
                <p className="text-md font-normal">
                  Phone: {currentUser.phone}
                </p>
                <p className="text-md font-normal">
                  Address: {currentUser.address}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 text-lg font-semibold self-start border border-red-600 p-1 rounded-lg hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 text-lg font-semibold self-start border border-red-600 p-1 rounded-lg hover:bg-red-600 hover:text-white"
              >
                Delete account
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-red-700">Login First</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProfile;
