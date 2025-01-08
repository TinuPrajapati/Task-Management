import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TaskOperation from "../Admin/TaskOperation.jsx";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

const EditProject = () => {
  const { name, d } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    assignedTo: "",
    taskTitle: "",
    completedDate: "",
    description: "",
  });

  const getData = async () => {
    try {
      const respone = await axios.get(
        `${import.meta.env.VITE_backend}/admin/task/${id}`
      );
      setFormData(respone.data);
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      getUsers(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_backend}/admin/edit_task/${id}`,
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

  const getUsers = async (role) => {
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
      text="Edit Task"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      users={users}
    />
  );
};

export default EditProject;