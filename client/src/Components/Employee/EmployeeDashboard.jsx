import React, { useState, useEffect } from "react";
import Task from "../../Common/TaskNumber.jsx"
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";
import axios from "axios";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";
import { accept, pending, complete, reject } from "../../../assets/index.js"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployeeDashboard = () => {
  const { name } = useParams();
  const navigate = useNavigate()
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);
  const menu = useSelector(state => state.menu.menuState);

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
    const initializeDashboard = async () => {
      const isValid = await checkCookieValidity(name, navigate);
      if (isValid) {
        getData();
      }
    };

    initializeDashboard();
  }, [name]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-scroll">
      <h1 className={`${menu?"p-0":"pl-10"} text-3xl font-bold`}>Welcome back, {name} 👋</h1>
      <div className="w-full h-[18%] flex gap-4">
        <Task task=" Pending Task" color="bg-blue-500" count={pendingTasks.length} img={pending} />
        <Task task=" Accept Task" color="bg-green-500" count={acceptTasks.length} img={accept} />
        <Task task=" Complete Task" color="bg-yellow-500" count={completeTasks.length} img={complete} />
        <Task task=" Failed Task" color="bg-red-500" count={rejectTasks.length} img={reject} />
      </div>

      <div
        id="showTask"
        className="w-full h-[75%] p-4 flex bg-white rounded-md border-2 border-red-400"
      >
        {pendingTasks.map((task) => (
          <TaskDetails key={task._id} task={task} refreshData={getData} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
