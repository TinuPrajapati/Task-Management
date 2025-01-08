import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import Task from "../../Common/TaskNumber.jsx";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

import { accept, pending, complete, reject } from "../../../assets/index.js"
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { name } = useParams();
  const [display, setDisplay] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);
  const navigate = useNavigate();
  const menu = useSelector(state => state.menu.menuState);

  

  return (
    <div className="w-full h-[80%] flex flex-col gap-4 overflow-y-scroll">
      {/* <div className="w-full h-[40vh] flex gap-2">
        <div className="w-[60%] h-full">
          <h1 className={`${menu ? "p-0" : "pl-10"} text-3xl font-bold h-[30%]`}>Welcome back, {name} 👋</h1>
          <div className="w-full h-[70%] grid grid-cols-2 grid-rows-2 gap-4">
            <Task task=" Pending Task" color="bg-blue-500" count={pendingTasks.length} img={pending} />
            <Task task=" Accept Task" color="bg-green-500" count={acceptTasks.length} img={accept} />
            <Task task=" Complete Task" color="bg-yellow-500" count={completeTasks.length} img={complete} />
            <Task task=" Failed Task" color="bg-red-500" count={rejectTasks.length} img={reject} />
          </div>
        </div>
        <div></div>
      </div>

      <div
        id="showTask"
        className="w-full h-[75%] p-4 flex bg-white rounded-md border-2 border-red-400"
      >
        {pendingTasks.map((task) => (
          <TaskDetails key={task._id} task={task} refreshData={getData} />
        ))}
      </div> */}
    </div>
  );
};

export default AdminDashboard;
