import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowTask = ({ task, refreshData }) => {
  const [show,setShow] = useState(false)
  const deleteTask = async () => {
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

  const display =()=>{
    setShow(!show)
  }

  return (
    <div
      key={task._id}
      className="w-[100%] h-[70%] px-5 py-2 rounded-md flex flex-col justify-evenly text-xl flex-shrink-0 relative"
      style={{ backgroundColor: task.color }}
    >
      <h1>Employee Name: {task.assignedTo}</h1>
      <p>Task Name: {task.taskTitle}</p>
      <p>Category : {task.category}</p>
      <p>Status : {task.status}</p>
      <p>Description: {task.description}</p>
      <div className="absolute top-2 right-2">
        <button onClick={display}>
          <i class="ri-more-2-line"></i>
        </button>
        <div
          className={`${show?"block":"hidden"} flex flex-col items-start gap-2 absolute right-2 bg-white text-black px-2 py-2 rounded-md`}
        >
          {/* <button>Edit</button> */}
          <button
            onClick={deleteTask}
            className="bg-black text-white px-2 py-1 rounded-md active:scale-75"
          >
            Delete
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ShowTask;
