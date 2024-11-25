import React, { useState, useEffect } from "react";
import Header from "../../Common/Header";
import Task from "../../Common/TaskNumber.jsx"
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
  const { name } = useParams();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);
  
  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend}/${name}/tasks`);
      setPendingTasks(response.data.filter((el) => el.status === "pending"));
      setAcceptTasks(response.data.filter((el) => el.status === "accept"));
      setCompleteTasks(response.data.filter((el) => el.status === "complete"));
      setRejectTasks(response.data.filter((el) => el.status === "reject"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      <Header greet="Hello" name={name} />
      <div className="w-full h-[20%] flex justify-evenly items-center gap-4">
        <Task task=" Pending Task" color="bg-blue-500" count={pendingTasks.length}/>
        <Task task=" Accept Task" color="bg-green-500"count={acceptTasks.length} />
        <Task task=" Complete Task" color="bg-yellow-500" count={completeTasks.length}/>
        <Task task=" Failed Task" color="bg-red-500" count={rejectTasks.length}/>
      </div>
      <div
        id="showTask"
        className="w-full h-[60%] py-4 flex flex-nowrap gap-5 overflow-x-auto"
      >
        {pendingTasks.map((task) => (
          <TaskDetails key={task._id} task={task} refreshData={getData} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
