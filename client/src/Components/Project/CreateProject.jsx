import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TaskOperation from "./TaskOperation.jsx";
import { checkCookieValidity } from "../../utils/cookiesValidation.js";
import { Link } from "react-router-dom";

const CreateProject = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    assignedTo: "",
    taskTitle: "",
    completedDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      getData(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/admin/assign_task`,
        formData
      );
      // alert(response.data);
      toast.success(response.data);
      setTimeout(() => {
        navigate(`/admin/${name}/all_tasks`);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Error creating task. Please try again.");
    }
  };

  const getData = async (role) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend}/admin/users`,
        { role }
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const initializeDashboard = async () => {
      await checkCookieValidity(name, navigate);
    };

    initializeDashboard();
  }, [name]);


  return (
    <div className="w-full relative">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[-7%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Create New Project</h2>
        <Link to={`/${name}/all_projects`} className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90">Show All Projects</Link>
      </div>

      <div className="w-full px-4 py-10">
        <TaskOperation formData={formData} users={users} handleChange={handleChange}/>
      </div>
    </div>
  );
};

export default CreateProject;