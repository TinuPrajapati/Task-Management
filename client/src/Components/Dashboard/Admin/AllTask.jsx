import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShowTask from "./ShowTask";
import ShowUsers from "./ShowUsers.jsx";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { checkCookieValidity } from "../../../utils/cookiesValidation.js";

const AdminTask = () => {
  const { name, operation } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/${operation}`
      );
      if (operation === "all_users") {
        return setData(response.data.filter((el) => el.role_type != "Admin"));
      } else if (operation === "all_tasks") {
        return setData(response.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const initializeDashboard = async () => {
    const isValid = await checkCookieValidity(name, navigate);
    if (isValid) {
      getData();
    }
  };
  useEffect(() => {
    initializeDashboard();
  }, [name]);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      <div className="w-full h-full bg-gray-500  backdrop-blur-sm rounded-md flex flex-col">
        <div className="w-full border-b-2 h-[10%] border-white flex justify-between items-center px-10 text-2xl">
          <h1>All Task</h1>

          <Link
            to={`/dashboard/admin/${name}`}
            className="w-[12%] h-[80%] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md active:scale-90 duration-200"
          >
            Dashboard
          </Link>
        </div>
        <div
          id="scrollbar"
          className={` ${
            data.length > 0 && "grid grid-cols-3 grid-rows-2 gap-4"
          } w-full h-[85%] px-5 overflow-y-auto mt-4`}
        >
          {data.length > 0 ? (
            operation === "all_tasks" ? (
              data.map((el) => (
                <ShowTask key={el._id} task={el} refreshData={getData} />
              ))
            ) : (
              data.map((el) => (
                <ShowUsers key={el._id} el={el} refreshData={getData} />
              ))
            )
          ) : (
            <div className="w-full h-full flex justify-center items-center text-3xl flex-col opacity-50 gap-4">
              <i class="ri-information-line text-9xl"></i>
              <p className="font-serif">
                {operation === "all_tasks" ? "No Task Found" : "No User found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTask;
