import React, { useEffect, useState } from "react";
import Header from "../../Common/Header.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

const AdminDashboard = () => {
  const { name } = useParams();

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      <Header greet="Hello Admin" name={name} />
      <div className="w-full h-[80%] bg-slate-600 py-2 rounded-lg flex flex-col gap-2">
        <div className="w-full h-[15%] flex justify-between items-center font-serif text-2xl px-10 border-b-2 py-2">
          <Link to={`/admin/${name}/all_task`} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full w-[15%] rounded-md active:scale-90 duration-500 flex justify-center items-center" >All Tasks</Link>
          <Link
            to={`/admin/${name}/create_user`}
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-[25%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Create New Employee Id
          </Link>
          <Link
            to={`/admin/${name}/assign_task`}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full w-[22%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Assign New Task
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
