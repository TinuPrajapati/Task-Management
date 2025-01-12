import React, { useState } from "react";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import loginPic from "../../assets/login.png";
import { useDispatch } from "react-redux";
import { changeState } from "../../feature/loaderSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }
    if (!password) {
      return toast.error("Please enter your password");
    }
    dispatch(changeState(true));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/login`,
        { email, password }
      );

      Cookies.set(import.meta.env.VITE_cookies_name, response.data);
      getData();
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data || "An unexpected error occurred");
      console.log("Submit Details", err);
    }finally{
      dispatch(changeState(false));
    }
  };

  const getData = async () => {
    try {
      const token = Cookies.get(import.meta.env.VITE_cookies_name);
      if (!token) {
        return toast.error("Please login again");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/protected-route`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      setTimeout(() => {
        navigate(
          `/dashboard/${response.data.username}`
        );
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data || "An unexpected error occurred");
      console.log(`Check Token: ${error}`);
    }
  };

  return (
    <div className="w-full h-full p-10 bg-sky-400 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] h-full flex">
        <div className="w-1/2 h-full flex flex-col justify-center items-start gap-3 px-4">
          <h2 className="text-[2.5rem] text-sky-400 font-bold text-center">Sign In</h2>
          <form className="w-[80%]" onSubmit={submitForm}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold text-lg mb-2 pl-4"
              >
                Enter Email
              </label>
              <div className="w-full flex items-center relative">
                <div className="absolute left-2 text-sky-400 text-lg font-semibold">
                  <i class="ri-mail-fill"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border-gray-300 border rounded-md pl-8 outline-none focus:ring-2 focus:ring-sky-400 text-lg font-semibold "
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold text-lg mb-2 pl-4"
              >
                Enter Password
              </label>
              <div className="w-full flex items-center relative">
                <div className="absolute left-2 text-sky-400 font-semibold text-lg">
                  <i class="ri-lock-fill"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   className="w-full h-12 border-gray-300 border rounded-md pl-8 outline-none focus:ring-2 focus:ring-sky-400 text-lg font-semibold "
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-sky-400 font-semibold text-lg"
                >
                  {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-line"></i>}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-[40%] h-14 mt-3 text-[1.8rem] bg-sky-400 text-white rounded-md font-bold duration-200 active:scale-90"
            >
              Login
            </button>
          </form>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center">
        <img src={loginPic} alt="no Image found" className="w-[80%] h-full" />
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
