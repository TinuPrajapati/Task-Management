import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import CreateTodos from './CreateTodos';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeState } from '../../feature/loaderSlice.js';
import ShowTodos from './ShowTodos.jsx';
import { ListTodo } from 'lucide-react';
import AssignedTodo from './AssignedTodo.jsx';

const Todos = () => {
    const dispatch = useDispatch()
    const token = Cookies.get(import.meta.env.VITE_cookies_name);
    const [display, setDisplay] = useState(false)
    const [h2Text, setH2Text] = useState("Yours Todos")


    const changeText = () => {
        if (h2Text === "Yours Todos") {
            setH2Text("Assigned Todos");
        } else {
            setH2Text("Yours Todos");
        }
        setDisplay(false)
    }

    return (
        <div className="w-full bg-gray-200 px-4 py-8">
            <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
                <div className='relative flex items-center'>
                    <ListTodo className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-semibold flex items-center gap-2 relative">{h2Text} </h2>
                    <span onClick={() => setDisplay(!display)}>{display ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</span>
                    <div className={`${display ? "block" : "hidden"} absolute z-10 w-48 bg-white border-2 p-2 rounded-md border-yellow-400 `}>
                        <button className="w-full px-3 py-1 text-xl  rounded-md active:scale-90 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200"
                            onClick={changeText}>
                            {h2Text != "Assigned Todos" ? "Assigned Todos" : "Yours Todos"}
                        </button>
                    </div>
                </div>
            </div>

            {h2Text === "Yours Todos" ? <ShowTodos/> : <AssignedTodo />}

            <ToastContainer />
        </div>
    )
}

export default Todos