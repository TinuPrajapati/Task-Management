import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputOption from "../Common/InputOption.jsx";
import Cookies from "js-cookie";
import useAuthCheck from "../../Custom Hook/useAuthCheck.js";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const { name, id } = useParams();
  useAuthCheck(name);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    number: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id == "role") {
      getUserDetails(value)
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const getUserDetails = async (value) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend}/admin/users/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(response.data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.role) {
      return toast.error("Please select a role.");
    }
    if (!formData.name) {
      return toast.error("Please enter a name.");
    }
    if (!formData.email) {
      return toast.error("Please enter an email.");
    }
    if (!formData.password) {
      return toast.error("Please enter a password.");
    }
    if (!formData.number) {
      return toast.error("Please enter a phone number.");
    }

    try {
      let response;
      if (id) {
        response = await axios.put(
          `${import.meta.env.VITE_backend}/admin/update_details/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_backend}/admin/signup`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      toast.success(response.data);
      setTimeout(() => {
        navigate(`/${name}/all_users`);
      }, 1000);

      // Clear form fields
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        number: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        role: response.data.role_type || "",
        password: "",
        number: response.data.number || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col gap-6">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">{id !== "undefined" ? "Edit User" : "Create New User"}</h2>
        <Link
          to={`/${name}/all_users`}
          className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
        >
          Show All Users
        </Link>
      </div>

      <form
        className="w-full flex flex-col gap-3 justify-center items-center px-10 py-5 bg-white rounded-md border-2 border-yellow-400"
        onSubmit={submitForm}
      >
        <div className="w-full flex justify-between items-center gap-10">
          <InputOption
            id="role"
            type="text"
            text="Role"
            placeholder="Enter user role"
            value={formData.role}
            handleChange={handleChange}
            options={["Admin", "HR", "Developer", "Designer", "Employee"]}
          />
          <div className="w-[50%] h-full flex flex-col gap-1">
            <label htmlFor="name" className="text-lg pl-3 font-semibold">Assigned To:</label>

            <select
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[100%] h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 focus:border-none duration-200 px-2 text-lg"
            >
              <option value="">Choose user</option>
              {users.length > 0 ? users.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              )) :
                <option value="">No users found</option>
              }
            </select>
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-10">
          <InputOption
            id="email"
            type="email"
            text="Email"
            placeholder="Enter user email"
            value={formData.email}
            handleChange={handleChange}
          />
          <InputOption
            id="password"
            type="password"
            text="Password"
            placeholder="Enter user password"
            value={formData.password}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <InputOption
            id="number"
            type="number"
            text="Phone Number"
            placeholder="Enter user phone number"
            value={formData.number}
            handleChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-[20%] h-12 bg-sky-500 text-2xl font-semibold rounded-md text-white active:scale-90 focus:ring-2 focus:ring-yellow-400 mt-6"
        >
          {id ? "Update User" : "Create User"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateEmployee;
