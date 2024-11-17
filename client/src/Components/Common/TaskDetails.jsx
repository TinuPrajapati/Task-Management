import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskDetails = ({ task,refreshData }) => {
  const updateStatus = async (e) => {
    const id = task._id;
    const status = e.target.innerText;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_backend}/task/status`,
        { id, status }
      );
      alert(response.data);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-[30%] h-full flex-shrink-0 rounded-xl p-4 hover:scale-y-110  duration-500`} style={{backgroundColor:task.color}}
    >
      <div className="w-full h-[15%] flex justify-between items-center text-xl">
        <p className="bg-red-500 w-[20%] h-full flex justify-center items-center rounded-md">
          High
        </p>
        <p className="border-b-2">{task.completedDate}</p>
      </div>
      <div className="w-full h-[85%] flex flex-col justify-center gap-2">
        <h2 className="text-xl font-serif h-[20%] ">{task.taskTitle}</h2>
        <p className="text-md h-[50%]">{task.description}</p>
        <div className=" w-full h-[30%] flex justify-evenly items-center">
          <button
            className="w-[30%] h-[80%] rounded-md bg-white text-black text-xl font-medium active:scale-75 duration-500"
            onClick={updateStatus}
          >
            Accept
          </button>
          <button
            className="w-[30%] h-[80%] rounded-md bg-white text-black text-xl font-medium active:scale-75 duration-500"
            onClick={updateStatus}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
