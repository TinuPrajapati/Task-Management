import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Task from "../Common/TaskNumber";
import TaskDetails from "../Common/TaskDetails";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
  const { name } = useParams();
  const [tasks, setTasks] = useState([]);
  
  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend}/${name}/tasks`);
      console.log(response.data)
      setTasks(response.data)
      // setTasks(response.data.filter((el) => el.assignedTo === name));
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
        <Task name=" Today Task" color="bg-blue-500" />
        <Task name=" Complete Task" color="bg-green-500" />
        <Task name=" Accept Task" color="bg-yellow-500" />
        <Task name=" Failed Task" color="bg-red-500" />
      </div>
      <div
        id="showTask"
        className="w-full h-[60%] py-4 flex flex-nowrap gap-5 overflow-x-auto"
      >
        {tasks.map((task) => (
          <TaskDetails key={task._id} task={task} refreshData={getData} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
