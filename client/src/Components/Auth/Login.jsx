import React, { useState } from "react";
import loginPic from "../../assets/Login-pic.jpg";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/google.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submimtForm = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
    }
    if (!password) {
      alert("Please enter your password");
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/login`,
        { email, password }
      );
      // alert(response.data.message);
      toast.success(response.data.message)
      const user = response.data.name;
     setTimeout(() => {
      if (response.data.role === "Admin") {
        navigate(`/dashboard/admin/${user}`);
      } else {
        navigate(`/dashboard/employee/${user}`);
      }
     }, 1000);
    } catch (err) {
      // alert(err.response.data);
      toast.error(err.response.data);
      console.log(err)
    }
    setEmail("");
    setPassword("");
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
          <div class="text-center">
            <p>
              Don't have an account?{" "}
              <a href="register.html" class="underline font-semibold">
                Register here.
              </a>
            </p>
          </div>
          {/* <div className="w-[50%] h-[12%] mt-4 flex justify-center items-center bg-gray-100">
            <button
              className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 active:scale-90 duration-500"
            >
              <img
                src={icon}
                alt="Google Logo"
                className="w-6 h-6 mr-3"
              />
              <span className="text-gray-700 font-medium">
                Sign Up with Google
              </span>
            </button>
          </div> */}
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
