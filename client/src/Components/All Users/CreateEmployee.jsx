import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { checkCookieValidity } from "../../utils/cookiesValidation.js";
import InputOption from "../Common/InputOption.jsx";
import Cookies from "js-cookie";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const token = Cookies.get(import.meta.env.VITE_cookies_name)
  const { name } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    number: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.role) {
      return toast.error("Please select your role");
    }
    else if (!formData.name) {
      return toast.error("Please enter your name");
    }
    else if (!formData.email) {
      return toast.error("Please enter your email");
    }
    else if (!formData.password) {
      return toast.error("Please enter your password");
    }
    else if (!formData.number) {
      return toast.error("Please enter your number");
    } 
    else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_backend}/admin/signup`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        toast.success(response.data);
        setTimeout(() => {
          navigate(`/${name}/all_users`);
        }, 1000);

        // Clear form fields
        setUser("");
        setEmail("");
        setRole("");
        setPassword("");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      await checkCookieValidity(name, navigate);
    };

    initializeDashboard();
  }, [name]);

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col gap-6">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Create New User</h2>
        <Link to={`/${name}/all_users`} className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90">Show All User</Link>
      </div>

      <form className="w-full flex flex-col gap-3 justify-center items-center gap- px-10 py-5 bg-white rounded-md border-2 border-yellow-400 " onSubmit={submitForm}>
        <div className="w-full flex justify-between items-center gap-10">
          <InputOption id="role" type="text" text="Category" placeholder={"Enter User role"} value={formData.role} handleChange={handleChange} options={["Admin", "HR", "Developer", "Designer", "Employee"]} />
          <InputOption id="name" type="text" text="Username" placeholder={"Enter User name"} value={formData.name} handleChange={handleChange} />
        </div>
        <div className="w-full flex justify-between items-center gap-10">
          <InputOption id="email" type="email" text="Email" placeholder={"Enter User company email"} value={formData.email} handleChange={handleChange} />
          <InputOption id="password" type="password" text="Password" placeholder={"Enter User company password"} value={formData.password} handleChange={handleChange} />
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <InputOption id="number" type="number" text="Phone Number" placeholder={"Enter User Phone Number"} value={formData.number} handleChange={handleChange} />
        </div>

        <button className="w-[20%] h-12 bg-sky-500 text-2xl font-semibold rounded-md text-white active:scale-90 focus:ring-2 focus:ring-yellow-400 mt-6">Create User</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateEmployee;
