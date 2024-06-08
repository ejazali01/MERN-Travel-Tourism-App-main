import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button, Spinner } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(loginSuccess(data?.user));
        navigate("/");
      } else {
        dispatch(loginFailure(data?.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-20">
        <div className=" grid md:grid-cols-2 grid-cols-1  md:border-2 md:rounded-lg md:shadow-lg ">
          <div className="h-[50vh] text-center items-center p-8">
            <div className="m-auto">
              <div className="mb-6">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                  Sign In
                </Typography>
                <Typography className="mb-6 text-gray-600 font-normal text-[18px]">
                  Enter your email and password to sign in
                </Typography>
                {error && <p className="text-sm  text-red-600">{error}</p>}
              </div>
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-[24rem] text-left"
              >
                <div className="mb-6">
                  <label htmlFor="email">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Your Email
                    </Typography>
                  </label>
                  <Input
                    id="email"
                    color="gray"
                    size="lg"
                    type="email"
                    name="email"
                    placeholder="name@mail.com"
                    className="w-full placeholder:opacity-100 "
                    onChange={handleChange}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password">
                    <Typography
                      variant="small"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Password
                    </Typography>
                  </label>
                  <Input
                    size="lg"
                    name="password"
                    onChange={handleChange}
                    placeholder="********"
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100"
                    type={passwordShown ? "text" : "password"}
                    icon={
                      <i onClick={togglePasswordVisiblity}>
                        {passwordShown ? (
                          <EyeIcon className="h-5 w-5" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-5" />
                        )}
                      </i>
                    }
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="mt-6 flex justify-center items-center bg-accent"
                  fullWidth
                >
                  {loading ? (
                    <>
                    <div className="flex items-center gap-4 justify-center">
                    <Spinner className="h-6 w-6" color="black" />
                    <h1 className="text-black">Loging...</h1>

                    </div>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="!mt-4 flex justify-end">
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    variant="small"
                    className="font-medium"
                  >
                    Forgot password
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  size="lg"
                  className="mt-6 flex h-12 items-center justify-center gap-2"
                  fullWidth
                >
                  <img
                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                    alt="google"
                    className="h-6 w-6"
                  />
                  sign in with google
                </Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="!mt-4 text-center font-normal"
                >
                  Not registered?{" "}
                  <Link to="/signup" className="font-medium text-gray-900">
                    Create account
                  </Link>
                </Typography>
              </form>
            </div>
          </div>

          <div className=" flex-1 justify-end hidden md:flex">
            <img
              className="w-full h-[600px] object-cover"
              src="../../images/bg-sign-in.avif"
              alt="signin_image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
