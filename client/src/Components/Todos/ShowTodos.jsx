import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeState } from '../../feature/loaderSlice.js';
import { toast } from "react-toastify";

const ShowTodos = ({ el, text, handleDelete }) => {
    const dispatch = useDispatch()
    const token = Cookies.get(import.meta.env.VITE_cookies_name);
    const [complete, setComplete] = useState(false);
    const [menu, setMenu] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [todoText, setTodoText] = useState(el.todo);

    const priorityColors = {
        Low: "bg-yellow-400",
        High: "bg-red-400",
        Medium: "bg-sky-400",
    };

    const handleEdit = () => {
        setIsEditable(true);
        setMenu(false); // Close the menu when editing starts
    };

    const handleInputChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleSave = async () => {
        dispatch(changeState(true))
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_backend}/admin/update_todo`,
                { id: el._id, todo: todoText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data)
            setIsEditable(false)
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeState(false))
        }
    };
    

    const handleButtonClick = () => {
        if (isEditable) {
            handleSave(); // Save and exit edit mode
        } else {
            setComplete((prev) => !prev); // Toggle completion if not in edit mode
        }
    };

    return (
        <div
            className="w-full border-2 border-yellow-400 bg-white rounded-md p-4 gap-4 relative"
            onMouseLeave={() => setMenu(false)}
        >
            {text === "Yours Todos" ? (
                // Layout for "Yours Todos"
                <div className="flex items-center gap-4">
                    <div className="w-[90%] flex gap-2 items-center">
                        <p className={`p-2 ${priorityColors[el.priority]} rounded-md text-white`}>
                            {el.priority}
                        </p>
                        <input
                            type="text"
                            value={todoText}
                            onChange={handleInputChange}
                            readOnly={!isEditable}
                            className={`p-2 flex-grow rounded-md outline-none focus:ring-4 focus:ring-sky-400 focus:border-sky-400 ${complete ? "line-through text-gray-400" : "text-black"
                                } ${isEditable ? "border-2 border-sky-400" : "border-none"}`}
                        />
                    </div>
                    <button
                        className={`p-2 w-[8%] ${isEditable ? "bg-blue-400" : "bg-green-400"} text-white rounded-md`}
                        onClick={handleButtonClick}
                    >
                        {isEditable ? "Save" : complete ? "Undo" : "Complete"}
                    </button>
                    <button
                        className="active:scale-90 text-xl"
                        onClick={() => setMenu(true)}
                    >
                        <CiMenuKebab />
                    </button>
                    <div
                        className={`${menu ? "block" : "hidden"} absolute w-24 flex flex-col gap-2 bg-white border-2 border-sky-400 rounded-md p-2 right-4 top-[60%]`}
                    >
                        <button
                            className="w-full h-8 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200 hover:rounded-md text-lg active:scale-90"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button className="w-full h-8 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200 hover:rounded-md text-lg active:scale-90"
                        onClick={()=>handleDelete(el._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                // Layout for other cases
                <div className="flex flex-col gap-2">
                    {/* Priority and Menu */}
                    <div className="flex items-center justify-between">
                        <p className={`p-2 ${priorityColors[el.priority]} rounded-md text-white`}>
                            {el.priority}
                        </p>
                        <div className="flex gap-1">
                            <button
                                className="active:scale-90 text-xl"
                                onClick={() => setMenu(!menu)}
                            >
                                <CiMenuKebab />
                            </button>
                            <div
                                className={`${menu ? "block" : "hidden"} absolute w-24 flex flex-col gap-2 bg-white border-2 border-sky-400 rounded-md p-2 right-6 top-[15%]`}
                            >
                                <button
                                    className="w-full h-8 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200 hover:rounded-md text-lg active:scale-90"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                                <button className="w-full h-8 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200 hover:rounded-md text-lg active:scale-90"
                                onClick={()=>handleDelete(el._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Category, User */}
                    <div className="flex flex-col gap-2">
                        <p>Category: {el.category}</p>
                        <p>User: {el.user}</p>
                    </div>
                    {/* Todo Input */}
                    <p className="text-center font-bold text-lg">Todo</p>
                    <input
                        type="text"
                        value={todoText}
                        onChange={handleInputChange}
                        readOnly={!isEditable}
                        className={`flex-grow rounded-md outline-none focus:ring-4 focus:ring-sky-400 ${complete ? "line-through text-gray-400" : "text-black"
                            } ${isEditable ? "border-2 border-sky-400 h-10 px-1" : "border-none"}`}
                    />
                    <div className="w-full flex justify-center">
                        <button
                            className={`p-2 ${isEditable ? "bg-blue-400" : "bg-green-400"} text-white rounded-md`}
                            onClick={handleButtonClick}
                        >
                            {isEditable ? "Save" : complete ? "Undo" : "Complete"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowTodos;
