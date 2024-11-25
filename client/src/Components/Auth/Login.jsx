import React, { useState } from "react";
import loginPic from "../../assets/Login-pic.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submimtForm = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }
    if (!password) {
      return toast.error("Please enter your password");
    }
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
      toast.error(err.response.data);
      console.log("Submit Details", err);
    }
  };

  const getData = async () => {
    try {
      const token = Cookies.get(import.meta.env.VITE_cookies_name);
      if (!token) {
        return toast.error("Please Login again");
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
        if (response.data.role === "Admin") {
          navigate(`/dashboard/${response.data.role.toLowerCase()}/${response.data.username}`);
        } else {
          navigate(`/dashboard/${response.data.role.toLowerCase()}/${response.data.username}`);
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response.data);
      console.log(`Check Token:${error}`);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex p-10">
      <div class="w-1/2 h-full flex flex-col">
        <div class="w-20 h-[5%] flex justify-center items-center">
          <a href="#" class="bg-black text-white font-bold text-xl p-4">
            Logo
          </a>
        </div>

        <div class="w-full h-[95%] flex flex-col justify-center items-center px-10">
          <p class="text-center text-3xl">Welcome.</p>
          <form
            class="w-full h-[60%] flex flex-col items-center justify-evenly pt-3 px-10"
            onSubmit={submimtForm}
          >
            <div class=" w-full flex flex-col">
              <label for="email" class="text-md">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class=" w-full flex flex-col">
              <label for="password" class="text-md">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                name="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-[60%] h-[18%] rounded-md text-xl font-serif bg-black text-white active:scale-90 duration-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div class="w-1/2 h-full ">
        <img
          class="object-cover w-full h-full md:block rounded-xl shadow-2xl"
          src={loginPic}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
