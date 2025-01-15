import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import CreateTodos from './CreateTodos';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import { changeState } from '../../feature/loaderSlice.js';
import ShowTodos from './ShowTodos.jsx';

const Todos = () => {
    const dispatch = useDispatch()
    const token = Cookies.get(import.meta.env.VITE_cookies_name);
    const [display, setDisplay] = useState(false)
    const [showCreateTodos, setShowCreateTodos] = useState(false)
    const [h2Text, setH2Text] = useState("Yours Todos")
    const [todos, setTodos] = useState([])

    const changeText = () => {
        if (h2Text === "Yours Todos") {
            setH2Text("Assigned Todos");
        } else {
            setH2Text("Yours Todos");
        }
        setDisplay(false)
    }

    const getTodos = async()=>{
        dispatch(changeState(true))
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_backend}/admin/todos/${h2Text}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTodos(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            dispatch(changeState(false))
        }
    }

    const handleDelete = async (id) => {
        dispatch(changeState(true))
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_backend}/admin/delete_todo/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data)
            getTodos()
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeState(false))
        }
    };

    useEffect(()=>{
        getTodos()
    },[h2Text,showCreateTodos])

    return (
        <div className="w-full bg-gray-200 px-4 py-8">
            {showCreateTodos && <CreateTodos setShowCreateTodos={setShowCreateTodos} />}
            <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
                <div className='relative'>
                    <h2 className="text-3xl font-semibold flex items-center gap-2 relative">{h2Text} <span onClick={() => setDisplay(!display)}>{display ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</span></h2>
                    <div className={`${display ? "block" : "hidden"} absolute z-10 w-48 bg-white border-2 p-2 rounded-md border-yellow-400 `}>
                        <button className="w-full px-3 py-1 text-xl  rounded-md active:scale-90 hover:bg-sky-400/40 hover:text-white hover:font-bold duration-200"
                            onClick={changeText}>
                            {h2Text != "Assigned Todos" ? "Assigned Todos" : "Yours Todos"}
                        </button>
                    </div>
                </div>
                <div>
                    <button className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
                        onClick={() => setShowCreateTodos(!showCreateTodos)}>
                        Create Todos
                    </button>
                </div>
            </div>

            <div className={`w-full ${h2Text=="Yours Todos"?"flex":"grid grid-cols-4"} gap-4`}>
                {todos.map((el)=>(
                    <ShowTodos key={el._id} el={el} text={h2Text} handleDelete={handleDelete} />
                ))}

            </div>

            <ToastContainer />
        </div>
    )
}

export default Todos