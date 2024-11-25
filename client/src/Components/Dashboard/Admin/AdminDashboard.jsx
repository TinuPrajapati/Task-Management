import React, { useEffect, useState } from "react";
import Header from "../../Common/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import Task from "../../Common/TaskNumber.jsx";
import Cookies from "js-cookie"

const AdminDashboard = () => {
  const { name } = useParams();
  const [display,setDisplay] = useState(false)
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);
  const navigate = useNavigate()

  const showButton = (e)=>{
    if(e._reactName === "onMouseEnter"){
      setDisplay(!display)
    }
    if(e._reactName === "onMouseLeave"){
      setDisplay(!display)
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend}/admin/all_tasks`
      );
      setPendingTasks(response.data.filter((el) => el.status === "pending"));
      setAcceptTasks(response.data.filter((el) => el.status === "accept"));
      setCompleteTasks(response.data.filter((el) => el.status === "complete"));
      setRejectTasks(response.data.filter((el) => el.status === "reject"));
    } catch (error) {
      console.log(error);
    }
  };

  const checkDetails = async()=>{
    try {
      const token = Cookies.get(import.meta.env.VITE_cookies_name);
      if(!token){
        navigate("/login")
      }
      const response = await axios.get(`${import.meta.env.VITE_backend}/protected-route`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.username===name){
        getData()
      }else{
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkDetails()
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 px-8 py-5 text-white flex flex-col gap-6">
      {/* Dashboard Top Part */}
      <Header greet="Hello Admin" name={name} />

      {/* Container */}
      <div className="w-full h-[80%] bg-slate-600 py-2 rounded-lg flex flex-col gap-2">
        <div className="w-full h-[15%] flex justify-between items-center font-serif text-2xl px-10 border-b-2 py-2">
          {/* Dropdown of All Task and All Users details*/}
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full w-[15%] rounded-md flex justify-center items-center flex-col relative" onMouseEnter={showButton} onMouseLeave={showButton} >
            <p>All Details</p>
            <div className={`${display?"flex":"hidden"} absolute top-[102%] flex-col w-full bg-white justify-center items-center gap-2 py-2 rounded-md`} >
              {/* all Task option */}
              <Link to={`/admin/${name}/all_tasks`} className="w-[80%] h-10 bg-gradient-to-b from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center rounded-md active:scale-90 duration-200">All Task</Link>
              {/* all Users option */}
              <Link to={`/admin/${name}/all_users`} className="w-[80%] h-10 bg-gradient-to-b from-pink-400 via-purple-500 to-indigo-600 flex justify-center items-center rounded-md active:scale-90 duration-200">All Users</Link>
            </div>
          </div>

          {/* Create User Option */}
          <Link
            to={`/admin/${name}/create_user`}
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-[25%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Create New Employee Id
          </Link>

          {/* Assign Task Option */}
          <Link
            to={`/admin/${name}/assign_task`}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full w-[22%] rounded-md active:scale-90 duration-500 flex justify-center items-center"
          >
            Assign New Task
          </Link>
        </div>
        <div className="w-full h-[85%] flex justify-evenly items-center gap-4 px-4 py-8">
          <Link to={`/admin/${name}/all_tasks`} className="w-[25%] h-full" ><Task task=" Pending Task" color="bg-blue-500" count={pendingTasks.length}/></Link>
          <Link to={`/admin/${name}/all_tasks`} className="w-[25%] h-full" ><Task task=" Accept Task" color="bg-green-500" count={acceptTasks.length}/></Link>
          <Link to={`/admin/${name}/all_tasks`} className="w-[25%] h-full" ><Task task=" Complete Task" color="bg-yellow-500" count={completeTasks.length}/></Link>
          <Link to={`/admin/${name}/all_tasks`} className="w-[25%] h-full" ><Task task=" Reject Task" color="bg-red-500" count={rejectTasks.length}/></Link>
          
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
