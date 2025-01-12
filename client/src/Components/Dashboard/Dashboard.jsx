import React, { useState, useEffect } from 'react';
import { accept, pending, complete, reject } from "../../assets/index.js";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import Task from './TaskNumber.jsx';
import LeftSide from './Left Side/LeftSide.jsx';
import RightSide from './Right Side/RightSide.jsx';
import axios from 'axios';
import Cookies from "js-cookie";
import useAuthCheck from '../../Custom Hook/useAuthCheck.js';
import ShowProject from '../Project/ShowProject.jsx';
import { useDispatch } from 'react-redux';
import { changeState } from '../../feature/loaderSlice.js';

const Dashboard = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);
  const [project, setProject] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const backendUrl = import.meta.env.VITE_backend;

  // Auth check is moved outside of useEffect
  useAuthCheck(name);

  const getData = async () => {
    dispatch(changeState(true))
    try {
      const response = await axios.get(`${backendUrl}/admin/all_projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const date = new Date().toDateString();
      setProject(response.data.filter((el) => new Date(el.createdAt).toDateString() == date))
      setPendingTasks(response.data.filter((el) => el.status === "pending"));
      setAcceptTasks(response.data.filter((el) => el.status === "accept"));
      setCompleteTasks(response.data.filter((el) => el.status === "complete"));
      setRejectTasks(response.data.filter((el) => el.status === "reject"));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }finally{
      dispatch(changeState(false))
    }
  };

  const handleDelete = async (id) => {
    dispatch(changeState(true))
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_backend}/admin/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success(response.data);
      getProjects()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(changeState(false))
    }
  };

  const handleFavorite = async (id, value) => {
    dispatch(changeState(true))
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_backend}/admin/favorite`, { id, favorite: value }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      toast.success(response.data);
      getProjects()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(changeState(false))
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full px-4 py-9 bg-gray-200">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <h1 className={` text-3xl font-bold`}>Welcome back,<span className='text-sky-400'> {name}</span> 👋</h1>
      </div>
      <div className="w-full h-[18%] flex gap-4 mb-6">
        <Task task="All Pending Projects" color="bg-blue-500" count={pendingTasks.length} img={pending} />
        <Task task="All Accept Projects" color="bg-green-500" count={acceptTasks.length} img={accept} />
        <Task task="All Complete Projects" color="bg-yellow-500" count={completeTasks.length} img={complete} />
        <Task task="All Failed Projects" color="bg-red-500" count={rejectTasks.length} img={reject} />
      </div>

      <div className="flex w-full gap-4 mb-4">
        <LeftSide />
        <RightSide />
      </div>

      <div className="w-full border-2 border-yellow-400 bg-white rounded-md p-4">
        <h1 className="text-2xl font-bold">Today Projects</h1>
        <div className="w-full grid grid-cols-2 gap-4 px-4 py-10">
          {project.map((el) => (
            <ShowProject el={el} key={el._id} handleDelete={handleDelete} handleFavorite={handleFavorite} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;