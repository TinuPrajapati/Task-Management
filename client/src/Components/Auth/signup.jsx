import React, { useState } from "react";
import signupPic from "../../assets/Login-pic.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { name } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!user) {
      return alert("Please enter your name");
    }
    if (!email) {
      return alert("Please enter your email");
    }
    if (!role) {
      return alert("Please select your role");
    }
    if (!password) {
      return alert("Please enter your password");
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/admin/signup`, // Backend URL from .env
        {
          name: user,
          email,
          role,
          password,
          admin: name,
        }
      );

      alert("Signup successful!");

      // // Redirect to login or dashboard
      navigate(`/dashboard/admin/${name}`);

      // Clear form fields
      setUser("");
      setEmail("");
      setRole("");
      setPassword("");
    } catch (err) {
      // Error handling
      alert(err.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex p-10">
      <div className="w-1/2 h-full flex flex-col">
        <div className="w-20 h-[5%] flex justify-center items-center">
          <a href="#" className="bg-black text-white font-bold text-xl p-4">
            Logo
          </a>
        </div>

        <div className="w-full h-[95%] flex flex-col justify-center items-center px-10">
          <p className="text-center text-3xl">Create an Account</p>
          <form
            className="w-full h-[80%] flex flex-col items-center justify-evenly pt-3 px-10"
            onSubmit={submitForm}
          >
            <div className="w-full flex flex-col">
              <label htmlFor="name" className="text-md">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
                value={user}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="email" className="text-md">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="role" className="text-md">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose role</option>
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="password" className="text-md">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-[60%] h-[15%] rounded-md text-xl font-serif bg-black text-white active:scale-90 duration-500"
            >
              Signup
            </button>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="underline font-semibold">
                Login here.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full">
        <img
          className="object-cover w-full h-full md:block rounded-xl shadow-2xl"
          src={signupPic}
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
