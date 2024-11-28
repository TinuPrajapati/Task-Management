import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";
import Button from "./Button.jsx";

const ShowUsers = ({ el, refreshData }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const handleDelete = async () => {
    const id = el._id;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_backend}/task/${id}`
      );
      toast.success(response.data);
      refreshData();
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
    <div
      key={el._id}
      className="w-[100%] h-[100%] pl-5 bg-sky-400  py-2 rounded-md flex justify-evenly text-xl flex-shrink-0"
      
    >
      <div className="w-[95%] h-full flex flex-col gap-2 justify-evenly">
        <p>Name : {el.name}</p>
        <p>Email : {el.email}</p>
        <p>Role : {el.role_type}</p>
        <p>Create : {new Date(el.createdAt).toLocaleDateString()}</p>
      </div>
      <Button
        name={name}
        task={el}
        handleDelete={handleDelete}
        navigate={navigate}
      />
      <ToastContainer />
    </div>
  );
};

export default ShowUsers;
