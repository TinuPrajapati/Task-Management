import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TaskOperation from "./TaskOperation";

const EditTask = () => {
  const { name,id } = useParams();
  const navigate = useNavigate();
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

  useEffect(()=>{
    getData();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // alert(response.data);
      toast.success(response.data);
      setTimeout(() => {
        navigate(`/admin/${name}/all_task`);
      }, 1000);
      
    } catch (error) {
      console.error(error);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <TaskOperation text="Edit Task" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
};

export default EditTask;
