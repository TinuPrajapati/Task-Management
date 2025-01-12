import React, { useState, useEffect } from 'react'
import { task } from '../../../assets'
import axios from 'axios';
import Cookies from 'js-cookie';

const LeftSide = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [acceptTasks, setAcceptTasks] = useState([]);
    const [rejectTasks, setRejectTasks] = useState([]);
    const token = Cookies.get(import.meta.env.VITE_cookies_name);
    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_backend}/admin/all_projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const date = new Date().toDateString();
            setPendingTasks(response.data.filter((el) => el.status === "pending" && new Date(el.createdAt).toDateString() == date));
            setAcceptTasks(response.data.filter((el) => el.status === "accept" && new Date(el.createdAt).toDateString() == date));
            setCompleteTasks(response.data.filter((el) => el.status === "complete" && new Date(el.createdAt).toDateString() == date));
            setRejectTasks(response.data.filter((el) => el.status === "reject" && new Date(el.createdAt).toDateString() == date));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-[50%]'>
            <div className="flex justify-between items-center bg-white rounded-md py-2 px-4 border-2 border-yellow-400 mb-4">
                <div className='w-[60%]'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome To</h2>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Task Management Area</h3>
                </div>
                <img src={task} alt="Task Management Illustration" className=" h-44" />
            </div>

            <div className="flex gap-4 ">
                <div className='bg-white rounded-md p-4 border-2 border-yellow-400 w-full'>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Today Work Progress</h2>
                    <div className='text-xl flex justify-evenly mt-4'>
                        <div className='flex flex-col gap-6'>
                            <p>Pending Project : {pendingTasks.length}</p>
                            <p>Completed Project : {completeTasks.length}</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p>Accept Project : {acceptTasks.length}</p>
                            <p>Rejected Project : {rejectTasks.length}</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide