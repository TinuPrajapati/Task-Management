import React, { useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import InputOption from "../Common/InputOption"
import axios from "axios"
import Cookies from 'js-cookie'
import useUserDetails from '../../Custom Hook/useUserDetails';

const CreateTodos = ({ setShowCreateTodos }) => {
    const token = Cookies.get(import.meta.env.VITE_cookies_name);
    const [display, setDisplay] = useState("")
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        priority: "",
        category: "",
        assignedTo: "",
        todo: ""
    })

    const handleChange = async (e) => {
        const { id, value } = e.target;
        if (id === "category") {
            const fetchedUsers = await useUserDetails(value);
            setUsers(fetchedUsers);
        }
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_backend}/admin/create_todo`,
                { ...formData, display },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data);
            setTimeout(() => {
                setShowCreateTodos(false)
            }, 1000);
        } catch (error) {
            toast.error(error.response.data.message)
            console.error(error.response.data);
        }
    };


    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full bg-black/50 p-10 duration-200 flex justify-center'>
            <div className='w-[40%] h-full bg-white border-2 border-yellow-400 rounded-md p-5'>
                <div className='w-full h-[10%] flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold'>Create Todos</h2>
                    <button className='text-xl hover:text-3xl duration-200 active:scale-90'
                        onClick={() => setShowCreateTodos(false)}>
                        <RxCrossCircled />
                    </button>
                </div>
                {display == "" ?
                    <div className=' w-full h-[80%] flex justify-center items-center gap-10'>
                        <button className="bg-sky-400 px-5 py-2 text-2xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
                            onClick={() => setDisplay("personal")}
                        >Personal</button>
                        <button className="bg-sky-400 px-5 py-2 text-2xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
                            onClick={() => setDisplay("assigned")}
                        >Assigned</button>
                    </div>
                    :
                    <form className='w-full h-[90%] flex flex-col justify-center gap-2 px-5' onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-2">
                            <InputOption
                                id="priority"
                                type="text"
                                text="Projct priority:"
                                placeholder="Enter Task priority"
                                value={formData.priority}
                                handleChange={handleChange}
                                options={["Low", "Medium", "High"]}
                                width={100}
                            />
                            {display == "assigned" &&
                                <>
                                    <InputOption
                                        id="category"
                                        type="text"
                                        text="Project Category:"
                                        placeholder="Choose Project Category"
                                        value={formData.category}
                                        handleChange={handleChange}
                                        options={["Admin", "HR", "Developer", "Designer", "Employee"]}
                                        width={100}
                                    />
                                    <div className="w-[100%] flex flex-col gap-1">
                                        <label htmlFor="assignedTo" className="text-lg pl-3 font-semibold">
                                            Assign To:
                                        </label>
                                        <select
                                            id="assignedTo"
                                            value={formData.assignedTo}
                                            onChange={handleChange}
                                            className="w-full h-10 rounded-md text-black border-2 outline-none focus:ring-4 focus:border-sky-400 duration-200 px-2 text-lg"
                                        >
                                            <option value="">Choose Employee</option>
                                            {users.length > 0 ? (
                                                users.map((el) => (
                                                    <option value={el.name} key={el._id}>
                                                        {el.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">No Employees Found</option>
                                            )}
                                        </select>
                                    </div>
                                </>
                            }

                        </div>

                        <div className='w-full'>
                            <InputOption
                                id="todo"
                                type="text"
                                text="Todo:"
                                placeholder="Enter Todo"
                                value={formData.todo}
                                handleChange={handleChange}
                                width={100}
                            />
                        </div>
                        <button className="bg-sky-400 w-[50%] h-[8vh] text-2xl border-4 border-yellow-400 rounded-md text-white active:scale-90 mt-4">Create Todo</button>
                    </form>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateTodos