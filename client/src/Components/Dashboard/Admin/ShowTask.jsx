import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";
import Button from "./Button.jsx";

const ShowTask = ({ task, refreshData }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [show, setShow] = useState(false);
  const handleDelete = async () => {
    const id = task._id;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_backend}/task/${id}`
      );
      // alert(response.data);
      toast.success(response.data);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const display = (e) => {
    setShow(!show);
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      await checkCookieValidity(name, navigate);
    };

    initializeDashboard();
  }, [name]);

  return (
    <div
      key={task._id}
      className="w-[100%] h-[100%] pl-5  py-2 rounded-md flex justify-evenly text-xl flex-shrink-0"
      style={{ backgroundColor: task.color }}
    >
      <div className="w-[95%] h-full flex flex-col gap-2 justify-evenly">
        <h1>Employee Name: {task.assignedTo}</h1>
        <p>Task Name: {task.taskTitle}</p>
        <p>Category : {task.category}</p>
        <p>Status : {task.status}</p>
        <p>Description: {task.description}</p>
      </div>
      <Button name={name} task={task} handleDelete={handleDelete} navigate={navigate}/>
      <ToastContainer />
    </div>
  );
};

export default ShowTask;
