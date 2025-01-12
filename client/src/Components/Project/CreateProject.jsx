import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import TaskOperation from "./TaskOperation.jsx";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useAuthCheck from "../../Custom Hook/useAuthCheck.js";

const CreateProject = () => {
  const { name, id } = useParams();
  useAuthCheck(name);
  const navigate = useNavigate();
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    priority: "",
    category: "",
    assignedTo: "",
    ProjectTitle: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "category") {
      getData(value);
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      const missingFields = Object.keys(formData).filter(
        (key) => !formData[key].trim()
      );
      if (missingFields.length > 0) {
        toast.error(`Please fill all fields: ${missingFields.join(", ")}`);
        return;
      }
    }

    try {
      let response;
      if (id) {
        response = await axios.put(
          `${import.meta.env.VITE_backend}/admin/update_project/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_backend}/admin/assign_project`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      toast.success(response.data || "Task created successfully!");
      setTimeout(() => {
        navigate(`/${name}/all_projects`);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Error creating task. Please try again.");
    }
  };

  const getData = async (role) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/users/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getProjectDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/particular_project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData(response.data);
      setUsers([{ name: response.data.assignedTo }]);
    } catch (error) {
      console.error("Error fetching Project:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProjectDetails();
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[-7%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">
          {id ? "Edit Project Details" : "Create New Project"}
        </h2>
        <Link
          to={`/${name}/all_projects`}
          className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
        >
          Show All Projects
        </Link>
      </div>
      <div className="w-full px-4 py-10">
        <TaskOperation
          formData={formData}
          users={users}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          id={id}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProject;
