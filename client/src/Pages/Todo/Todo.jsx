import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import YoruTodos from './YourTodos';
import AssignedTodos from './AssignedTodos';

const Todos = () => {
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
        <div className="w-full px-4 py-2 ">
            <div className="w-full h-16 py-1.5 px-4 flex items-center justify-center gap-14 mb-4">
                <button
                    className={`${h2Text === "Yours Todos" ? "border-none bg-purple-400 text-white" : "bg-white"} w-[20%] h-full  border-2 border-yellow-400 rounded-lg font-semibold text-2xl  duration-500`}
                    onClick={changeText}
                >
                    Your Todos
                </button>
                <button
                    className={`${h2Text === "Assigned Todos" ? "border-none bg-purple-400 text-white" : "bg-white"} w-[25%] h-full  border-2 border-yellow-400 rounded-lg font-semibold text-2xl  duration-500`}
                    onClick={changeText}
                >
                    Assigned Todos
                </button>
            </div>

            {h2Text === "Yours Todos" ? <YoruTodos /> : <AssignedTodos />}

            {/* <ToastContainer /> */}
        </div>
    )
}

export default Todos