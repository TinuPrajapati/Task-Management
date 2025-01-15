import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeState } from '../../../feature/loaderSlice';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const RightSide = () => {
  const dispatch = useDispatch();
  const token = Cookies.get(import.meta.env.VITE_cookies_name);
  const backendUrl = import.meta.env.VITE_backend;
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [acceptTasks, setAcceptTasks] = useState([]);
  const [rejectTasks, setRejectTasks] = useState([]);

  const getData = async () => {
    dispatch(changeState(true))
    try {
      const response = await axios.get(`${backendUrl}/admin/all_projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const date = new Date().toDateString();
      // setProject(response.data.filter((el) => new Date(el.createdAt).toDateString() == date))
      setPendingTasks(response.data.filter((el) => el.status === "pending"));
      setAcceptTasks(response.data.filter((el) => el.status === "accept"));
      setCompleteTasks(response.data.filter((el) => el.status === "complete"));
      setRejectTasks(response.data.filter((el) => el.status === "reject"));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      dispatch(changeState(false))
    }
  };

  const data = {
    labels: ['Pending', 'Accept', 'Complete', 'Rejected'],
    datasets: [
      {
        label: 'Project',
        data: [pendingTasks.length, acceptTasks.length, completeTasks.length, rejectTasks.length],
        backgroundColor: ['blue', 'yellow', 'green', 'red'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-[50%] p-4 bg-white border-2 border-yellow-400 rounded-md'>
      <h2 className='text-2xl font-semibold'>All Projects Percentage</h2>
      <div className='flex items-center justify-start mt-4 pl-5'>
        {/* Left Side: Labels */}
        <div className='w-[30%] space-y-4 text-right pr-4'>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-blue-500 mr-2 rounded-full'></div>
            <span>Pending : {pendingTasks.length}</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-yellow-500 mr-2 rounded-full'></div>
            <span>Accept : {acceptTasks.length}</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-green-500 mr-2 rounded-full'></div>
            <span>Complete : {completeTasks.length}</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-red-500 mr-2 rounded-full'></div>
            <span>Rejected : {rejectTasks.length}</span>
          </div>
        </div>

        {/* Right Side: Chart */}
        <div className='w-[70%] flex justify-center items-center'>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
