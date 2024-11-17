import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import ShowTask from "../Common/ShowTask.jsx"

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { name } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/alltasks`
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      <Header greet="Hello Admin" name={name} />
      <div className="w-full h-[80%] bg-slate-600 py-2 rounded-lg flex flex-col gap-2">
        <div className="w-full h-[15%] flex justify-between items-center font-serif text-2xl px-10 border-b-2 py-2">
          <h2>All Tasks</h2>
          <Link
            to={`/admin/${name}/create_user`}
            className="bg-sky-500 h-full w-[25%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Create New Employee Id
          </Link>
          <Link
            to={`/admin/${name}/assgin_task`}
            className="bg-sky-500 h-full w-[22%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Assign New Task
          </Link>
        </div>
        <div
          id="scrollbar"
          className="w-full h-[85%] px-5 grid grid-cols-3 gap-4 overflow-y-auto"
        >
          {tasks.map((task) => (
            <ShowTask key={task._id} task={task} refreshData={getData}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
