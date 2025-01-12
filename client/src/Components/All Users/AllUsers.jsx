import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ShowUsers from "./ShowUsers.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeState } from "../../feature/loaderSlice.js";
import CheckboxOptions from "../Common/CheckboxOptions.jsx";
import useAuthCheck from "../../Custom Hook/useAuthCheck.js";

const AllUsers = () => {
  const { name } = useParams();
  useAuthCheck(name)
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    admin: false,
    hr: false,
    developer: false,
    designer: false,
  });

  // Helper function to handle API requests
  const apiRequest = async (method, url, data = {}) => {
    dispatch(changeState(true));
    try {
      const response = await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message || "Action successful");
      getData(); // Refresh data after successful action
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    } finally {
      dispatch(changeState(false));
    }
  };

  const handleDelete = (id) =>
    apiRequest("delete", `${import.meta.env.VITE_backend}/admin/delete_user/${id}`);

  const handleFavorite = (id, favorite) =>
    apiRequest("put", `${import.meta.env.VITE_backend}/admin/user_favorite`, { id, favorite });

  // Apply filters to users
  const applyFilters = (users) => {
    return users.filter((user) => {
      if (filters.admin && user.role_type === "Admin") return true;
      if (filters.hr && user.role_type === "HR") return true;
      if (filters.developer && user.role_type === "Developer") return true;
      if (filters.designer && user.role_type === "Designer") return true;
      return !filters.admin && !filters.hr && !filters.developer && !filters.designer;
    });
  };

  // Fetch data from the API
  const getData = async () => {
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }
    dispatch(changeState(true));
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend}/admin/all_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(applyFilters(response.data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    } finally {
      dispatch(changeState(false));
    }
  };

  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const toggleDisplay = () => setDisplay((prev) => !prev);

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="w-full h-full px-4 py-8 flex flex-col gap-6 bg-gray-200">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link to={`/${name}/all_users`} className="text-3xl font-semibold">
          All Users
        </Link>
        <div className="flex gap-4">
          <Link
            to={`/${name}/create_user`}
            className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
          >
            Create New User
          </Link>
          <button
            onClick={toggleDisplay}
            className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
            aria-label="Toggle filter options"
          >
            Filter
          </button>
          {display && (
            <div className="absolute z-30 top-[110%] right-0 bg-white rounded-md px-4 py-2 border-2 border-yellow-400">
              <CheckboxOptions
                id="admin"
                text="Admin Users"
                value={filters.admin}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="hr"
                text="HR Users"
                value={filters.hr}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="developer"
                text="Developer Users"
                value={filters.developer}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="designer"
                text="Designer Users"
                value={filters.designer}
                handleFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {users.map((el) => (
          <ShowUsers
            key={el.id}
            el={el}
            handleDelete={handleDelete}
            handleFavorite={handleFavorite}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllUsers;