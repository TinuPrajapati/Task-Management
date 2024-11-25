import React, { useState, useEffect } from "react";
import signupPic from "../../../assets/Login-pic.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.name) {
      return toast.error("Please enter your name");
    }
    if (!formData.email) {
      return toast.error("Please enter your email");
    }
    if (!formData.role) {
      return toast.error("Please select your role");
    }
    if (!formData.password) {
      return toast.error("Please enter your password");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/admin/signup`,
        formData
      );
      toast.success(response.data);
      setTimeout(() => {
        navigate(`/dashboard/admin/${name}`);
      }, 1000);

      // Clear form fields
      setUser("");
      setEmail("");
      setRole("");
      setPassword("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      await checkCookieValidity(name, navigate);
    };

    initializeDashboard();
  }, [name]);

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
                value={formData.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
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
                value={formData.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="role" className="text-md">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
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
                value={formData.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
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
      <ToastContainer />
    </div>
  );
};

export default CreateEmployee;
