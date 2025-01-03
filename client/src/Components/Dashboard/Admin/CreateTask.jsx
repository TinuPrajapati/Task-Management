import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TaskOperation from "./TaskOperation";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

const CreateTask = () => {
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
    <TaskOperation
      text="Assign Task"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      users={users}
    />
  );
};

export default CreateTask;
